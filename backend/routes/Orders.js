const express= require("express")
const router=express.Router()
const {createOrder} =require('../controllers/Auth')

router.post("/createOrder",createOrder)


module.exports=router;