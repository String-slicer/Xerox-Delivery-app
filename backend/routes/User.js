
const express= require("express")
const router=express.Router()

const {sendotp}= require("../controllers/Auth");
const {signup}=require("../controllers/Auth")


router.post("/sendotp",sendotp)
router.post("/signup",signup)

module.exports=router;