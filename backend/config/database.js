const mongoose =require("mongoose")
require("dotenv").config();

exports.connect=()=>{
    // console.log(process.env.MONGODB_URL);
    mongoose.connect(process.env.MONGODB_URL,{
        // userNewUrlParser:true,
        // useUnifiedTopology:true,
        maxPoolSize: 50,
        wtimeoutMS: 2500,
    })
    .then(()=>console.log("DB Connected Successfully"))
    .catch((error)=>{
        console.log("DB connection Failed");
        console.error(error);
        process.exit(1);
    })
}