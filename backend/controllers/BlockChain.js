const { ethers } = require("ethers");
const fileAccessContract = require("../build/contracts/FileAccess.json");
const dotenv = require("dotenv");
dotenv.config();

function connect() {
  // Define the signer (a wallet to sign transactions)
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const privateKey = process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);

  // Replace with your deployed contract's address and ABI
  const contractAddress = fileAccessContract.networks[5777].address;
  // const contractAddress = process.env.CONTRACT_ADDRESS;
  const contractABI = fileAccessContract.abi;

  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);
  return contract;
}

// Add a file to the contract
exports.uploadFile = async (req, res) => {
  const { fileId, ipfsHash } = req.body; // Expect `fileId` and `ipfsHash` in the request body
  
  if (!fileId || !ipfsHash) {
    return res.status(400).json({ error: "fileId and ipfsHash are required" });
  }

  try {
    const contract = connect();
    const tx = await contract.uploadFile(fileId, ipfsHash); // Call uploadFile in the contract
    await tx.wait(); // Wait for the transaction to be mined
    res.json({ message: "File uploaded successfully", transactionHash: tx.hash });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
};

// Assign a store to a file
exports.assignStore = async (req, res) => {
  const { fileId, storeId } = req.body; // Expect `fileId` and `storeId` in the request body

  if (!fileId || !storeId) {
    return res.status(400).json({ error: "fileId and storeId are required" });
  }

  try {
    const contract = connect();
    const tx = await contract.assignStore(fileId, storeId); // Call assignStore in the contract
    await tx.wait(); // Wait for the transaction to be mined
    res.json({ message: "Store assigned successfully", transactionHash: tx.hash });
  } catch (error) {
    console.error("Error assigning store:", error);
    res.status(500).json({ error: "Failed to assign store" });
  }
};

// Retrieve a file from the contract 
exports.getFile = async (req, res) => {
  const { fileId, storeId } = req.body; // Expect `fileId` and `storeId` in the request body

  if (!fileId || !storeId) {
    return res.status(400).json({ error: "fileId and storeId are required" });
  }

  try {
    const contract = connect();
    const ipfsHash = await contract.getFile(fileId, storeId); // Call getFile in the contract
    res.json({ ipfsHash }); // Return the IPFS hash
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).json({ error: "Failed to retrieve file" });
  }
};

// Controller to add a store
exports.addStore = async (req, res) => {
  const { storeId } = req.body; // Expect `storeId` in the request body

  if (!storeId) {
    return res.status(400).json({ error: "storeId is required" });
  }

  try {
    const contract = connect();

    // Call the `addStore` function in the contract
    const tx = await contract.addStore(storeId);

    // Wait for the transaction to be mined
    await tx.wait();

    res.json({
      message: "Store added successfully",
      transactionHash: tx.hash,
      storeId,
    });
  } catch (error) {
    console.error("Error adding store:", error);
    res.status(500).json({ error: "Failed to add store" });
  }
};

// Controller to check if a store ID is valid
exports.isStoreValid = async (req, res) => {
  const { storeId } = req.body; // Expect `storeId` in the request body

  if (!storeId) {
    return res.status(400).json({ error: "storeId is required" });
  }

  try {
    const contract = connect();
    const isValid = await contract.isStoreValid(storeId); // Call isStoreValid in the contract
    res.json({ isValid });
  } catch (error) {
    console.error("Error checking store validity:", error);
    res.status(500).json({ error: "Failed to check store validity" });
  }
};