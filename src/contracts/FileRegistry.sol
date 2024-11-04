// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileRegistry {
    uint public fileCounter = 0; // Licznik do generowania unikalnych fileID

    // Struktura przechowująca dane o pliku
    struct File {
        uint fileId; // Unikalny identyfikator pliku
        bytes32 fileHash; // Hash pliku (np. SHA-256)
        string fileName; // Nazwa pliku
        uint timestamp; // Data dodania pliku
        address uploader; // Adres użytkownika, który dodał plik
        uint version; // Numer wersji pliku
        uint baseFileId; // ID bazowego pliku, aby śledzić wersje
    }

    // Mapowanie ID pliku do jego danych
    mapping(uint => File) private files;

    // Lista wszystkich fileId w systemie
    uint[] private allFileIds;

    // Mapowanie adresu użytkownika do listy fileId, które dodał
    mapping(address => uint[]) private userFiles;

    // Mapowanie hash bazowego pliku do listy fileId jego wersji
    mapping(uint => uint[]) private fileVersions;

    // Mapowanie hash do jego ID pliku, aby uniknąć duplikatów
    mapping(bytes32 => uint) private fileHashToId;

    // Wydarzenie emitowane przy dodawaniu nowego pliku lub jego wersji
    event FileAdded(
        uint indexed fileId,
        bytes32 fileHash,
        string fileName,
        uint timestamp,
        address uploader,
        uint version,
        uint baseFileId
    );

    /**
     * @notice Dodaje nowy plik lub nową wersję istniejącego pliku
     * @param fileHash Hash pliku
     * @param fileName Nazwa pliku
     * @param baseFileId ID bazowego pliku, jeśli jest to nowa wersja; 0 jeśli to nowy plik
     */
    function addFile(
        bytes32 fileHash,
        string memory fileName,
        uint baseFileId
    ) public {
        // Sprawdzenie, czy hash pliku już istnieje
        require(
            fileHashToId[fileHash] == 0,
            "File with this hash already exists"
        );

        uint fileId = ++fileCounter; // Generowanie nowego unikalnego fileID
        uint timestamp = block.timestamp;
        uint version = 1; // Domyślnie wersja 1 dla nowego pliku

        // Jeśli jest to nowa wersja istniejącego pliku, pobieramy numer wersji
        if (baseFileId != 0) {
            require(
                files[baseFileId].fileId == baseFileId,
                "Base file does not exist"
            );
            version =
                files[
                    fileVersions[baseFileId][
                        fileVersions[baseFileId].length - 1
                    ]
                ].version +
                1;
        } else {
            baseFileId = fileId; // Jeśli to nowy plik, ustawiamy jego własne ID jako bazowe
        }

        // Tworzenie nowego pliku (lub wersji) i zapisywanie go w mapowaniu
        files[fileId] = File({
            fileId: fileId,
            fileHash: fileHash,
            fileName: fileName,
            timestamp: timestamp,
            uploader: msg.sender,
            version: version,
            baseFileId: baseFileId
        });

        // Dodanie fileId do listy wszystkich plików, do plików użytkownika i do wersji bazowego pliku
        allFileIds.push(fileId);
        userFiles[msg.sender].push(fileId);
        fileVersions[baseFileId].push(fileId);

        // Mapa hash do ID pliku
        fileHashToId[fileHash] = fileId;

        // Emitowanie wydarzenia przy dodaniu pliku lub jego wersji
        emit FileAdded(
            fileId,
            fileHash,
            fileName,
            timestamp,
            msg.sender,
            version,
            baseFileId
        );
    }

    /**
     * @notice Pobiera dane pliku na podstawie jego ID
     * @param fileId Unikalny identyfikator pliku
     * @return Dane pliku
     */
    function getFile(uint fileId) public view returns (File memory) {
        require(files[fileId].fileId == fileId, "File does not exist");
        return files[fileId];
    }

    /**
     * @notice Pobiera wszystkie pliki w rejestrze
     * @return Lista wszystkich plików
     */
    function getAllFiles() public view returns (File[] memory) {
        File[] memory allFiles = new File[](allFileIds.length);
        for (uint i = 0; i < allFileIds.length; i++) {
            allFiles[i] = files[allFileIds[i]];
        }
        return allFiles;
    }

    /**
     * @notice Pobiera wszystkie pliki przesłane przez konkretnego użytkownika
     * @param user Adres użytkownika
     * @return Lista plików przesłanych przez danego użytkownika
     */
    function getUserFiles(address user) public view returns (File[] memory) {
        uint[] memory userFileIds = userFiles[user];
        File[] memory userFilesList = new File[](userFileIds.length);
        for (uint i = 0; i < userFileIds.length; i++) {
            userFilesList[i] = files[userFileIds[i]];
        }
        return userFilesList;
    }

    /**
     * @notice Weryfikuje, czy podany hash odpowiada konkretnej wersji pliku
     * @param fileId Unikalny identyfikator pliku
     * @param fileHash Hash do weryfikacji
     * @param version Numer wersji do weryfikacji
     * @return Zwraca true, jeśli wersja pliku o podanym ID i hashu istnieje, w przeciwnym razie false
     */
    function verifySpecificVersion(
        uint fileId,
        bytes32 fileHash,
        uint version
    ) public view returns (bool) {
        require(files[fileId].fileId == fileId, "File does not exist");
        require(files[fileId].version >= version, "Version does not exist");

        // Sprawdzenie, czy hash pliku zgadza się z podanym hashem dla danej wersji
        if (
            files[fileId].fileHash == fileHash &&
            files[fileId].version == version
        ) {
            return true; // Hash i wersja zgadzają się
        }

        // Dla wersji bazowej, iterujemy przez wersje, aby znaleźć zgodność
        uint[] memory versionIds = fileVersions[files[fileId].baseFileId];
        for (uint i = 0; i < versionIds.length; i++) {
            if (
                versionIds[i] == fileId &&
                files[versionIds[i]].fileHash == fileHash &&
                files[versionIds[i]].version == version
            ) {
                return true; // Zgodność hasha i wersji pliku
            }
        }

        return false; // Brak zgodności
    }

    /**
     * @notice Pobiera wszystkie wersje pliku na podstawie jego bazowego ID
     * @param baseFileId Unikalny identyfikator bazowego pliku
     * @return Lista wersji pliku
     */
    function getFileVersions(
        uint baseFileId
    ) public view returns (File[] memory) {
        require(
            files[baseFileId].fileId == baseFileId,
            "Base file does not exist"
        );

        uint[] memory versionIds = fileVersions[baseFileId];
        File[] memory versions = new File[](versionIds.length);

        for (uint i = 0; i < versionIds.length; i++) {
            versions[i] = files[versionIds[i]];
        }

        return versions;
    }
}
