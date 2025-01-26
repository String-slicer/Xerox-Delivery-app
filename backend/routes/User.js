
const express= require("express")
const router=express.Router()

const {sendotp,UserSignup,UserLogin,UserProfile,updateDisplayPicture,UserOrders}= require("../controllers/Auth");


router.post("/sendotp",sendotp)
router.post("/userSignup",UserSignup)
router.post("/userLogin",UserLogin)
router.put("/userProfile",UserProfile)
router.put("/updateDisplayPicture",updateDisplayPicture)
router.get("/userOrders/:id",UserOrders)

module.exports=router;