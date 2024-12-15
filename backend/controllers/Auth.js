const User =require("../models/User")
const Captain =require("../models/Captain")
const OTP = require("../models/OTP");
const Order=require("../models/Orders")

const otpGenerator= require("otp-generator")
const mailSender=require("../utils/mailSender")
const bcrypt = require("bcrypt");
const {addStore} =require('./BlockChain')


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