const express= require("express")
const router=express.Router()

const {sendotp,StoreSignup,StoreLogin,StoreProfile}= require("../controllers/Auth");

router.post("/sendotp",sendotp)
router.post("/storeSignup",StoreSignup)
router.post("/storeLogin",StoreLogin)
router.put("/storeProfile",StoreProfile)

module.exports=router;