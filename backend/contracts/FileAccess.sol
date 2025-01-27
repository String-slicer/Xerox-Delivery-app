// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileAccess {
    // Struct to store file metadata
    struct File {
        string fileId;    // Unique file ID
        string ipfsHash;  // IPFS hash of the document
        string storeId;   // Store ID with access
    }

    // Mapping to store files based on unique file IDs
    mapping(string => File) private files; 

    // Mapping to validate store IDs
    mapping(string => bool) private storeIds;

    // Owner of the contract (Backend Wallet)
    address public admin;

    // Events
    event FileUploaded(string indexed fileId, string ipfsHash);
    event StoreAssigned(string indexed fileId, string storeId);
    event StoreAdded(string indexed storeId);
    event FileAccessed(string indexed fileId, string storeId, string ipfsHash);

    constructor() {
        admin = msg.sender; // Set deployer as admin
    }

    // Modifier to restrict actions to admin only
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    // Function to upload a file
    function uploadFile(
        string memory fileId,
        string memory ipfsHash
    ) external onlyAdmin {
        require(bytes(fileId).length > 0, "File ID cannot be empty");
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");

        files[fileId] = File({
            fileId: fileId,
            ipfsHash: ipfsHash,
            storeId: ""
        });

        emit FileUploaded(fileId, ipfsHash);
    }

    // Function to assign a store to a file
    function assignStore(
        string memory fileId,
        string memory storeId
    ) external onlyAdmin {
        require(bytes(fileId).length > 0, "File ID cannot be empty");
        require(bytes(storeId).length > 0, "Store ID cannot be empty");
        require(storeIds[storeId], "Invalid store ID");
        require(bytes(files[fileId].ipfsHash).length > 0, "File does not exist");

        files[fileId].storeId = storeId;

        emit StoreAssigned(fileId, storeId);
    }

    // Function to allow a store to access its files
    function getFile(string memory fileId, string memory storeId) external view returns (string memory) {
        File memory file = files[fileId];

        require(bytes(file.ipfsHash).length > 0, "File does not exist");
        require(keccak256(abi.encodePacked(file.storeId)) == keccak256(abi.encodePacked(storeId)), "Access denied");
        return file.ipfsHash;
    }

    // Function to add new store IDs (Admin only)
    function addStore(string memory storeId) external onlyAdmin {
        require(bytes(storeId).length > 0, "Store ID cannot be empty");
        require(!storeIds[storeId], "Store ID already exists");

        storeIds[storeId] = true;

        emit StoreAdded(storeId);
    }

    // Function to check if a store ID is valid
    function isStoreValid(string memory storeId) external view returns (bool) {
        return storeIds[storeId];
    }
}
