// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileAccess {
    // Struct to store file metadata
    struct File {
        string ipfsHash; // IPFS hash of the document
        uint256 timestamp; // Timestamp of file upload
        address uploader;  // Address of the uploader
        string storeId;    // Store ID with access
    }

    // Mapping to store files based on unique file IDs
    mapping(string => File) private files;

    // Mapping to validate store IDs
    mapping(string => bool) private storeIds;

    // Owner of the contract (Backend Wallet)
    address public admin;

    // Events
    event FileUploaded(string indexed fileId, string storeId, string ipfsHash, uint256 timestamp);
    event StoreAdded(string indexed storeId);

    constructor() {
        admin = msg.sender; // Set deployer as admin
    }

    // Modifier to restrict actions to admin only
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    // Function to upload a file and assign it to a store
    function uploadFile(
        string memory fileId,
        string memory storeId,
        string memory ipfsHash
    ) external onlyAdmin {
        require(bytes(fileId).length > 0, "File ID cannot be empty");
        require(bytes(storeId).length > 0, "Store ID cannot be empty");
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");
        require(storeIds[storeId], "Invalid store ID");

        files[fileId] = File({
            ipfsHash: ipfsHash,
            timestamp: block.timestamp,
            uploader: msg.sender,
            storeId: storeId
        });

        emit FileUploaded(fileId, storeId, ipfsHash, block.timestamp);
    }

    // Function to allow a store to access its files
    function getFile(string memory fileId, string memory storeId) external view returns (string memory, uint256) {
        File memory file = files[fileId];

        require(bytes(file.ipfsHash).length > 0, "File does not exist");
        require(keccak256(abi.encodePacked(file.storeId)) == keccak256(abi.encodePacked(storeId)), "Access denied");

        return (file.ipfsHash, file.timestamp);
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
