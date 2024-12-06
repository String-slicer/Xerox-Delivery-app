
const {ethers} =require("ethers");
const test=require("../build/contracts/Test.json")
const dotenv=require("dotenv")
dotenv.config()


function connect(){
        // Define the signer (a wallet to sign transactions)
    const provider=new ethers.JsonRpcProvider(process.env.RPC_URL)
    const privateKey=process.env.PRIVATE_KEY

    const wallet =new ethers.Wallet(privateKey,provider)

    // Replace with your deployed contract's address and ABI
    const contractAddress = test.networks[5777].address;
    const contractABI = test.abi;



    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);
    return contract;
}


exports.addFile=async(req,res)=>{
    const { cid, deliveryPartner } = req.body; // Expect `cid` and `deliveryPartner` in the request body

    if (!cid || !deliveryPartner) {
      return res.status(400).json({ error: "CID and deliveryPartner are required" });
    }
  
    try {
      const contract = connect();
      const tx = await contract.addFile(cid, deliveryPartner); // Call addFile in the contract
      await tx.wait(); // Wait for the transaction to be mined
      res.json({ message: "File added successfully", transactionHash: tx.hash });
    } catch (error) {
      console.error("Error adding file:", error);
      res.status(500).json({ error: "Failed to add file" });
    }
}

//Retrieve a file from the contract
exports.getFile=async(req,res)=>{
    const { deliveryPartner } = req.body; // Expect `cid` in the request body

    if (!deliveryPartner) {
      return res.status(400).json({ error: "deliveryPartner is required" });
    }
  
    try {
      const contract = connect();
      const file = await contract.getFile(deliveryPartner); // Call getFile in the contract
      res.json({ file });
    } catch (error) {
      console.error("Error getting file:", error);
      res.status(500).json({ error: "Failed to get file" });
    }

}

