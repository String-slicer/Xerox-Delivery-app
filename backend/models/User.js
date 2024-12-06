// This model represents the schema of users 

const mongoose =require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    fullName :{
            firstName :{
                type:String,
                required:true,
                trim:true,
                minlength:[3,"First name must be at least 3 characters long"],
            },
            lastName:{
                type:String,
                required:true,
                trim:true,
                minlength:[3,"Last name must be at least 3 characters long"],
            }
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref:"Profile",
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
    image:{
        type:String,
        required:true,
    },
    socketId:{
        type:String,
    },
    orders: {
        type: [ mongoose.Schema.Types.ObjectId ],
        ref: 'Order',
    },
    contact: {
        type: String,
        required: true,
        minlength: [ 10, 'Contact must be at least 10 characters long' ],
    },
    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    },
    
},{timestamps:true});


userSchema.methods.generateAuthToken =function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
    // return await bcrypt.hash()
}

module.exports=mongoose.model("user",userSchema);

