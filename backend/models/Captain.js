const mongoose =require('mongoose')
const bcrypt=require('jsonwebtoken')
const jwt =require('jsonwebtoken')

const captainSchema =new mongoose.Schema({
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
    required:true,
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
status: {
    type: String,
    enum: [ 'active', 'inactive' ],
    default: 'inactive',
},

vehicle: {
    color: {
        type: String,
        required: true,
        minlength: [ 3, 'Color must be at least 3 characters long' ],
    },
    plate: {
        type: String,
        required: true,
        minlength: [ 3, 'Plate must be at least 3 characters long' ],
    },

},
location: {
    ltd: {
        type: Number,
    },
    lng: {
        type: Number,
    }
},

})
captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}


captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('captain', captainSchema)


module.exports = captainModel;