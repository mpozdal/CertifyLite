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
    }

    // Mapowanie ID pliku do jego danych
    mapping(uint => File) private files;

    // Lista wszystkich fileId w systemie
    uint[] private allFileIds;

    // Mapowanie adresu użytkownika do listy fileId, które dodał
    mapping(address => uint[]) private userFiles;

    // Wydarzenie emitowane przy dodawaniu nowego pliku
    event FileAdded(
        uint indexed fileId,
        bytes32 fileHash,
        string fileName,
        uint timestamp,
        address uploader
    );

    /**
     * @notice Dodaje nowy plik do rejestru
     * @param fileHash Hash pliku
     * @param fileName Nazwa pliku
     */
    function addFile(bytes32 fileHash, string memory fileName) public {
        uint fileId = fileCounter++; // Generowanie nowego unikalnego fileID
        uint timestamp = block.timestamp;

        // Tworzenie nowego pliku i zapisywanie go w mapowaniu
        files[fileId] = File({
            fileId: fileId,
            fileHash: fileHash,
            fileName: fileName,
            timestamp: timestamp,
            uploader: msg.sender
        });

        // Dodanie fileId do listy wszystkich plików i do plików użytkownika
        allFileIds.push(fileId);
        userFiles[msg.sender].push(fileId);

        // Emitowanie wydarzenia przy dodaniu pliku
        emit FileAdded(fileId, fileHash, fileName, timestamp, msg.sender);
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
        // Tworzymy tablicę, aby pomieścić wszystkie pliki
        File[] memory allFiles = new File[](allFileIds.length);

        // Kopiujemy dane plików z mapowania do tablicy
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

        // Kopiujemy dane plików użytkownika do nowej tablicy
        for (uint i = 0; i < userFileIds.length; i++) {
            userFilesList[i] = files[userFileIds[i]];
        }

        return userFilesList;
    }

    /**
     * @notice Weryfikuje, czy podany hash odpowiada istniejącemu plikowi
     * @param fileHash Hash do weryfikacji
     * @return Zwraca true, jeśli plik o podanym hashu istnieje, w przeciwnym razie false
     */
    function verifyFile(bytes32 fileHash) public view returns (bool) {
        for (uint i = 0; i < allFileIds.length; i++) {
            if (files[allFileIds[i]].fileHash == fileHash) {
                return true; // Zgodność hasha - plik został zweryfikowany
            }
        }

        return false; // Brak zgodności - plik nie istnieje w rejestrze
    }
}
