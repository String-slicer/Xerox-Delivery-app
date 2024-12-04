
const express= require("express")
const router=express.Router()

const {addFile,getFile}= require("../controllers/BlockChain");

router.post("/saveDoc",addFile)
router.post("/getDoc",getFile)

module.exports=router;