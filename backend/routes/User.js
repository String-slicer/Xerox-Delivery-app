
const express= require("express")
const router=express.Router()

const {sendotp,UserSignup,UserLogin,UserProfile,updateDisplayPicture}= require("../controllers/Auth");


router.post("/sendotp",sendotp)
router.post("/userSignup",UserSignup)
router.post("/userLogin",UserLogin)
router.put("/userProfile",UserProfile)
router.put("/updateDisplayPicture",updateDisplayPicture)

module.exports=router;