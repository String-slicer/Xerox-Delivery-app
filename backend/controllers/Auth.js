const User =require("../models/User")
const Captain =require("../models/Captain")
const OTP = require("../models/OTP");
const Order=require("../models/Orders")

const otpGenerator= require("otp-generator")
const mailSender=require("../utils/mailSender")
const bcrypt = require("bcrypt");
const {addStore} =require('./BlockChain')
const { sendNewOrderToStores } = require('../socket');
const {sendMessageToSocketId} =require('../socket')
const Store=require("../models/Store")

exports.sendotp = async (req, res) => {
	try {
		const { email } = req.body;
        console.log(req.body);


		const checkUserPresent = await User.findOne({ email });

		if (checkUserPresent) {
			return res.status(401).json({
				success: false,
				message: `User is Already Registered`,
			});
		}

		var otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
		const result = await OTP.findOne({ otp: otp });
		console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);
		while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
		}
		const otpPayload = { email, otp };
		const otpBody = await OTP.create(otpPayload);
		console.log("OTP Body", otpBody);
		res.status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			otp,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ success: false, error: error.message });
	}
};

exports.UserSignup = async (req, res) => {
    try {
        const { email, firstName, lastName, password, contact } = req.body;


        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(401).json({
                success: false,
                message: "User is already registered",
            });
        }
        const hashedPassword = await User.hashPassword(password);

        const newUser = new User({
            fullName: { firstName, lastName },
            email,
            password: hashedPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`, 
            contact, // Add contract property
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.UserLogin=async (req,res)=>{
   
	try{
		const {email,password}=req.body;
		console.log(email)

		const checkUser=await User.findOne({email});
		if (!checkUser) {
            return res.status(401).json({
                success: false,
                message: "Entered email does not exists",
            });
        }
		const isPasswordValid = await bcrypt.compare(password, checkUser.password);
		if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password. Please try again.",
            });
        }
		const token=await checkUser.generateAuthToken();
		res.status(200).json({
            success: true,
            message: "Login successful",
			user: checkUser,
			token,
        });
	}
	catch(error){
		console.error(error.message);
        return res.status(500).json({ success: false, error: error.message });
	}
};

exports.CaptainSignup=async(req,res)=>{

	try{
		const {fullName,email, password, contact, vehicle}=req.body;
	
		const checkCaptain=await Captain.findOne({email});
		if (checkCaptain) {
            return res.status(401).json({
                success: false,
                message: "Captain is already registered",
            });
        }
		const hashedPassword=await Captain.hashPassword(password);
		const newCaptain=new Captain({
            fullName,
            email,
            password: hashedPassword,
            contact,
			vehicle,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${fullName.firstName} ${fullName.lastName}`,
		})
		await newCaptain.save();

        res.status(201).json({
            success: true,
            message: "Catain registered successfully",
        });
	}
    catch(error){
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
	}

}

exports.CaptainLogin=async(req,res)=>{
    console.log("hi");
	const {email,password}=req.body;

	try{
		const checkCaptain=await Captain.findOne({email});
		if(!checkCaptain){
			return res.status(401).json({
                success: false,
                message: "Entered email does not exists",
            });
		}
		
		const isPasswordValid=await checkCaptain.comparePassword(password);

		if(!isPasswordValid){
			return res.status(401).json({
                success: false,
                message: "Invalid Password. Please try again.",
			
            });
		}
		const token=await checkCaptain.generateAuthToken();
		res.status(200).json({
            success: true,
            message: "Login successful",
			captain: checkCaptain,
			token,
        });

	}
	catch(error){
		console.error(error.message);
        return res.status(500).json({ success: false, error: error.message });
	}

}

exports.StoreSignup=async(req,res)=>{
    try{
		const {StoreName,email, password,contact, address}=req.body;
	
		const checkStore=await Store.findOne({email});
		if (checkStore) {
            return res.status(401).json({
                success: false,
                message: "Store is already registered",
            });
        }
		const hashedPassword=await Store.hashPassword(password);
		const newStore=new Store({
            StoreName,
            email,
            password: hashedPassword,
            contact,
			address,
			image:`https://api.dicebear.com/5.x/initials/svg?seed=${StoreName}`,
		})
		await newStore.save();

        // Add storeId to blockchain
        await addStore({ body: { storeId: newStore._id.toString() } }, res);
		
        res.status(201).json({
            success: true,
            message: "Store registered successfully",
        });
	}
    catch(error){
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
	}
}
exports.StoreLogin=async(req,res)=>{
	const {email,password}=req.body;

	try{
		const checkStore=await Store.findOne({email});
		if(!checkStore){
			return res.status(401).json({
                success: false,
                message: "Entered email does not exists",
            });
		}
		const isPasswordValid=await checkStore.comparePassword(password);
		if(!isPasswordValid){
			return res.status(401).json({
                success: false,
                message: "Invalid Password. Please try again.",
            });
		}
		const token=await checkStore.generateAuthToken();
		res.status(200).json({
            success: true,
            message: "Login successful",
			store:checkStore,
			token,
        });

	}
	catch(error){
		console.error(error.message);
        return res.status(500).json({ success: false, error: error.message });
	}
}

exports.createOrder = async (req, res) => {
	try {
		const { documents, userId} = req.body;
		console.log(userId);
		console.log(documents);
  
	  if (!userId || !documents) {
		return res.status(400).json({ error: "User ID and documents are required" });
	  }
  
	  const newOrder = new Order({
		userId,
		documents,
		totalAmount: calculateTotalAmount(documents),
		status: 'Pending',
		// deliveryAddress: deliveryAddress,
		// deliverylocation: deliverylocation,
	  });
  
	  const savedOrder = await newOrder.save();
	  var user=await User.findById(userId);
		user.orders.push(savedOrder._id);
		await user.save();
	  const orderDetails = await Order.findById(savedOrder._id).populate('userId');
	  console.log("order details",orderDetails);
	  
	  // Send new order to all stores
      await sendNewOrderToStores(orderDetails);

	  res.status(201).json(savedOrder);
	} catch (error) {
	  console.error('Error creating order:', error);
	  res.status(500).json({ error: 'Error creating order' });
	}
  };
  
  const calculateTotalAmount = (documents) => {
	let totalAmount = 0;
	documents.forEach((doc) => {
	  const docCost = calculateDocumentCost(doc);
	  totalAmount += docCost * doc.copies;
	});
	return totalAmount;
  };
  
  const calculateDocumentCost = (doc) => {
	let baseCost = 5; 
  
	if (doc.folderType !== "None") baseCost += 2;
	if (doc.binding !== "None") baseCost += 3;
	if (doc.lamination !== "None") baseCost += 4; 
	if (doc.paperQuality === "Premium"||doc.paperQuality==="Standard") baseCost += 5; 
  
	return baseCost;
  };

exports.storeAcceptOrder = async (req, res) => {
	try {
		const { orderId, storeId } = req.body;
		const order = await Order.findById(orderId);
		if (!order) {
			return res.status(404).json({
				success: false,
				message: "Order not found",
			});
		}
		const store = await Store.findById(storeId);
		if (!store) {
			return res.status(404).json({
				success: false,
				message: "Store not found",
			});
		}
		store.orders.push(orderId);
		const captain = await Captain.findById(order.deliveryPartnerId);
		if (!captain) {
			return res.status(404).json({
				success: false,
				message: "Captain not found",
			});
		}
		captain.orders.push(orderId);
		order.status = "Accepted";
		order.storeId = storeId;

		await order.save();
		await store.save();
		await captain.save();

		const orderDetails = await Order.findById(orderId)
			.populate("storeId")
			.populate("deliveryPartnerId");

		const user = await User.findById(order.userId);
		console.log(user);
		sendMessageToSocketId(user.socketId, { event: "storeAcceptedOrder", data: { order: orderDetails } });
		res.status(200).json({
			success: true,
			message: "Order accepted successfully",
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({ success: false, error: error.message });
	}
};

exports.UserProfile=async(req,res)=>{
	try {
		const { email, firstName, lastName, contact, image } = req.body;
	    
		console.log(email,contact);
		if (!email) {
		  return res.status(400).json({ success: false, message: "Email is required." });
		}
	
		const user = await User.findOne({ email });
		if (!user) {
		  return res.status(404).json({ success: false, message: "User not found." });
		}
	
		if (firstName !== undefined) user.fullName.firstName = firstName;
		if (lastName !== undefined) user.fullName.lastName = lastName;
		if (contact !== undefined) user.contact = contact;
		if (image !== undefined) user.image = image;
	

		await user.save();
	
		res.status(200).json({
		  success: true,
		  message: "Profile updated successfully.",
		  user: {
			id: user._id,
			email: user.email,
			fullName: user.fullName,
			contact: user.contact,
			image: user.image,
		  },
		});
	  } catch (error) {
		console.error("Error updating profile:", error);
		res.status(500).json({ success: false, message: "An error occurred while updating the profile." });
	  }
}

exports.CaptainProfile= async(req,res)=>{
    const { email, firstName, lastName, contact, image, vehicleColor, vehiclePlate } = req.body;

    try {
        const captain = await Captain.findOne({email});

        if (!captain) {
            return res.status(404).json({ success: false, message: 'Captain not found' });
        }

        if (email) captain.email = email;
        if (firstName) captain.fullName.firstName = firstName;
        if (lastName) captain.fullName.lastName = lastName;
        if (contact) captain.contact = contact;
        if (image) captain.image = image;
        if (vehicleColor) captain.vehicle.color = vehicleColor;
        if (vehiclePlate) captain.vehicle.plate = vehiclePlate;

        await captain.save();

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: captain,
        });
    } catch (error) {
        console.error('Error updating captain profile:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating the profile',
        });
    }
}

exports.StoreProfile= async(req,res)=>{
    const { storeName, email, contact, address, image, locationLat, locationLng } = req.body;

  try {
    const store = await Store.findOne({ email });

    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }

    if (storeName) store.storeName = storeName;
    if (contact) store.contact = contact;
    if (address) store.address = address;
    if (image) store.image = image;
    if (locationLat) store.location.ltd = locationLat;
    if (locationLng) store.location.lng = locationLng;

    await store.save();

    res.status(200).json({ success: true, message: 'Store profile updated successfully', data: store });
  } catch (error) {
    console.error('Error updating store profile:', error);
    res.status(500).json({ success: false, message: 'An error occurred while updating the store profile' });
  }
}
