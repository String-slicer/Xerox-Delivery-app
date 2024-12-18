const express= require("express")
const router=express.Router()
const {createOrder,storeAcceptOrder} =require('../controllers/Auth')

router.post("/createOrder",createOrder)
router.post("/storeAcceptOrder",storeAcceptOrder)

module.exports=router;