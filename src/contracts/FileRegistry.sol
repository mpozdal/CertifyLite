pragma solidity ^0.8.0;

contract FileRegistry {
    struct FileRecord {
        address owner;
        bytes32 fileHash;
        string fileName;
    }

    mapping(bytes32 => FileRecord) public records;
    mapping(address => bytes32[]) public userFiles;
    uint256 public recordCount;

    function addRecord(bytes32 _fileHash, string memory _fileName) public {
        require(records[_fileHash].owner == address(0), "Hash already exists.");

        recordCount++;

        records[_fileHash] = FileRecord({
            owner: msg.sender,
            fileHash: _fileHash,
            fileName: _fileName
        });

        userFiles[msg.sender].push(_fileHash);
    }

    function verifyFileHash(bytes32 _fileHash) public view returns (bool) {
        return records[_fileHash].owner != address(0);
    }

    function getUserFiles() public view returns (FileRecord[] memory) {
        bytes32[] memory hashes = userFiles[msg.sender];
        FileRecord[] memory userRecords = new FileRecord[](hashes.length);

        for (uint256 i = 0; i < hashes.length; i++) {
            userRecords[i] = records[hashes[i]];
        }

        return userRecords;
    }
}
