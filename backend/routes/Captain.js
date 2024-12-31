const express= require("express")
const router=express.Router()

const {sendotp,CaptainSignup,CaptainLogin,CaptainProfile}= require("../controllers/Auth");

router.post("/sendotp",sendotp)
router.post("/captainSignup",CaptainSignup)
router.post("/captainLogin",CaptainLogin)
router.put("/captainProfile",CaptainProfile)

module.exports=router;