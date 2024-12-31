const razorpay = require("../config/razorpay"); // Import Razorpay instance
const Order = require("../models/Orders"); // Import Order model
const crypto = require("crypto");

// Create Razorpay Order
exports.capturePayments = async (req, res) => {
  try {

    console.log("request body:", req.body);
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if(!order){
        return res.status(404).json({
            success: false,
            message: "Order not found",
        });
    }


    // Create Razorpay order
    const options = {
      amount: order.totalAmount * 100, // Amount in paise
      currency: "INR",
      receipt: Math.random(Date.now()).toString(),
      notes:{
          orderId: orderId,
      }
    };
    const razorpayOrder = await razorpay.instance.orders.create(options);

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      razorpayOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Razorpay Payment
exports.verifyPayment = async (req, res) => {
  try {
    console.log("verify payment", req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, notes } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
    console.log("isAuthentic", isAuthentic);
    if (isAuthentic) {
      // Database comes here
      const orderId = notes.orderId;
      console.log(orderId);
      const order = await Order.findById(orderId);
      order.paymentStatus = "Completed";
      order.paymentId = razorpay_payment_id;
      await order.save();

      res.redirect(
        'http://localhost:5173/accepted'
      );
    } else {
      res.status(400).json({
        success: false,
      });
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};