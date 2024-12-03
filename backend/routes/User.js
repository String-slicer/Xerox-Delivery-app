
const express= require("express")
const router=express.Router()

const {sendotp}= require("../controllers/Auth");


router.post("/sendotp",sendotp)

module.exports=router;