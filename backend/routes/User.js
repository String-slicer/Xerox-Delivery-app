
const express= require("express")
const router=express.Router()

const {sendotp,UserSignup,UserLogin}= require("../controllers/Auth");


router.post("/sendotp",sendotp)
router.post("/userSignup",UserSignup)
router.post("/userLogin",UserLogin)

module.exports=router;