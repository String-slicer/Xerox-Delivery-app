const express= require("express")
const router=express.Router()
const {createOrder} =require('../controllers/Orders')

router.post("/createOrder",createOrder)


module.exports=router;