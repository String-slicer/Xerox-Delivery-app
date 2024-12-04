
const express= require("express")
const router=express.Router()

const {sendotp,signup,login}= require("../controllers/Auth");


router.post("/sendotp",sendotp)
router.post("/signup",signup)
router.post("/login",login)

module.exports=router;