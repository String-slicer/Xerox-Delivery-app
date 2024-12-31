
const express= require("express")
const router=express.Router()

const {sendotp,UserSignup,UserLogin,UserProfile}= require("../controllers/Auth");


router.post("/sendotp",sendotp)
router.post("/userSignup",UserSignup)
router.post("/userLogin",UserLogin)
router.put("/userProfile",UserProfile)

module.exports=router;