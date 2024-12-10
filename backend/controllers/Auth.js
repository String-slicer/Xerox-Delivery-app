const User =require("../models/User")
const Captain =require("../models/Captain")
const OTP = require("../models/OTP");

const otpGenerator= require("otp-generator")
const mailSender=require("../utils/mailSender")
const bcrypt = require("bcrypt");





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
		res.status(200).json({
            success: true,
            message: "Login successful",
			user: checkUser,
        });
	}
	catch(error){
		console.error(error.message);
        return res.status(500).json({ success: false, error: error.message });
	}
};

exports.CaptainSignup=async(req,res)=>{

	try{
		const {fullName,email, password, contact, vehicle,image}=req.body;
	
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
            image:image,
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
    
	const {email,password}=req.body;

	try{
		const checkCaptain=await Captain.findOne({email});
		if(!checkCaptain){
			return res.status(401).json({
                success: false,
                message: "Entered email does not exists",
            });
		}
		const isPasswordValid=await Captain.comparePassword(password);
		if(!isPasswordValid){
			return res.status(401).json({
                success: false,
                message: "Invalid Password. Please try again.",
            });
		}
		res.status(200).json({
            success: true,
            message: "Login successful",
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
		})
		await newStore.save();

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
		const isPasswordValid=await Store.comparePassword(password);
		if(!isPasswordValid){
			return res.status(401).json({
                success: false,
                message: "Invalid Password. Please try again.",
            });
		}
		res.status(200).json({
            success: true,
            message: "Login successful",
        });

	}
	catch(error){
		console.error(error.message);
        return res.status(500).json({ success: false, error: error.message });
	}
}