const express= require("express")
const router=express.Router()

const {sendotp,StoreSignup,StoreLogin}= require("../controllers/Auth");

router.post("/sendotp",sendotp)
router.post("/storeSignup",StoreSignup)
router.post("/storeLogin",StoreLogin)

module.exports=router;