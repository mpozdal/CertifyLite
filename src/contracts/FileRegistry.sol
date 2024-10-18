pragma solidity ^0.8.0;

contract FileRegistry {
    mapping(bytes32 => bool) public fileHashes;
    mapping(address => bytes32[]) public userHashes;

    function storeFileHash(bytes32 fileHash) public {
        require(!fileHashes[fileHash], "Hash already exists.");
        fileHashes[fileHash] = true;
        userHashes[msg.sender].push(fileHash);
    }

    function verifyFileHash(bytes32 fileHash) public view returns (bool) {
        return fileHashes[fileHash];
    }

    function getUserHashes() public view returns (bytes32[] memory) {
        return userHashes[msg.sender]; 
    }
    
}
