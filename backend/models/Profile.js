const mongoose= require("mongoose")

const profileSchema = new mongoose.Schema({
    gender:{
        type:String,
        required:true,

    },
    dob:{
        type:Date,
        required:true,
    },
    about:{
        type:String,
        required:true,
    },
});

modules.export = mongoose.model("Profile",profileSchema);