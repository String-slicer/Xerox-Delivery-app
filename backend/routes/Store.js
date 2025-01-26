const express= require("express")
const router=express.Router()

const {sendotp,StoreSignup,StoreLogin,StoreProfile,StoreOrders}= require("../controllers/Auth");

router.post("/sendotp",sendotp)
router.post("/storeSignup",StoreSignup)
router.post("/storeLogin",StoreLogin)
router.put("/storeProfile",StoreProfile)
router.get("/storeOrders/:id",StoreOrders)


module.exports=router;