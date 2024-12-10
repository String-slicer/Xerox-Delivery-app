const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const storeSchema = new mongoose.Schema({
    StoreName:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,"Store name must be at least 3 characters long"],
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    contact:{
        type: String,
        required: true,
        minlength: [ 10, 'Contact must be at least 10 characters long' ],
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
    image:{
        type:String,
        required:false,
    },
    socketId:{
        type:String,
    },
    orders: {
        type: [ mongoose.Schema.Types.ObjectId ],
        ref: 'Order',
    },
    status: {
        type: String,
        enum: [ 'active', 'inactive' ],
        default: 'inactive',
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

storeSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


storeSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

module.exports = mongoose.model("Store",storeSchema);