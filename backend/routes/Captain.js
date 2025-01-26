const express= require("express")
const router=express.Router()

const {sendotp,CaptainSignup,CaptainLogin,CaptainProfile,CaptainOrders}= require("../controllers/Auth");

router.post("/sendotp",sendotp)
router.post("/captainSignup",CaptainSignup)
router.post("/captainLogin",CaptainLogin)
router.put("/captainProfile",CaptainProfile)
router.get("/captainOrders/:id",CaptainOrders)
module.exports=router;