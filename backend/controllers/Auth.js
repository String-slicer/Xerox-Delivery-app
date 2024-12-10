const User =require("../models/User")
const OTP = require("../models/OTP");

const otpGenerator= require("otp-generator")
const mailSender=require("../utils/mailSender")
const bcrypt = require("bcrypt");






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

exports.signup = async (req, res) => {
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

exports.login=async (req,res)=>{
   
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
                message: "Invalid credentials. Please try again.",
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
