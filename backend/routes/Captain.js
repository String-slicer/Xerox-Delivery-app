const express= require("express")
const router=express.Router()

const {sendotp,CaptainSignup,CaptainLogin}= require("../controllers/Auth");

router.post("/sendotp",sendotp)
router.post("/captainSignup",CaptainSignup)
router.post("/captainLogin",CaptainLogin)

module.exports=router;