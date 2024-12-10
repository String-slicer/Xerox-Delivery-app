const jwt =require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/User");
const Captain=require("../models/Captain");
const Store=require("../models/Store");
exports.auth=async(req,res,next)=>{
    try{
        const token=req.cookies.token||req.body.token||req.header("Autherization").replace("Bearer ","");
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token is missing",
            });

        }
        try{
            const decode =jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            if(decode){
                if(decode._id){
                    const user=await User.findOne({_id:decode._id});
                    if(user){
                        req.user=user;
                        next();
                    }else{
                        const captain=await Captain.findOne({_id:decode._id});
                        if(captain){
                            req.captain=captain;
                            next();
                        }else{
                            return res.status(401).json({
                                success:false,
                                message:"user not found",
                            });
                        }
                    }
                }else{
                    return res.status(401).json({
                        success:false,
                        message:"user not found",
                    });
                }

            }
        }catch(error){
            return res.status(401).json({
                success:false,
                message:"invalid token",
            });
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"internal server error",
        });
    }
}

exports.isUser =async (req,res,next)=>{
    try{
        if(!req.user){
            return res.status(401).json({
                success:false,
                message:"the is a protected route for users",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again"
        })
    }
};

exports.isCaptain =async(req,res,next)=>{
    try{

        if(!req.captain){
            res.status(401).json({
                success:false,
                message:"this is a protected route for captains",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Captain role cannot be verified, please try again"
        })
    }

}
exports.isStore= async(req,res,next)=>{
    try{
        if(!req.store){
            res.status(401).json({
                success:false,
                message:"this is a protected route for stores",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Store role cannot be verified, please try again"
        })
    }
}
