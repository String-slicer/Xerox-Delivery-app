const express = require('express');
const router=express.Router();

const {capturePayments,verifyPayment}=require("../controllers/Payments");

router.post("/capturePayments",capturePayments);
router.post("/verifyPayment",verifyPayment);
module.exports=router;
