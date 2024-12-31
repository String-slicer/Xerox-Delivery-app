const express = require('express')
const app= express();
const http =require("http");
const database=require("./config/database")

const cookieParser =require("cookie-parser")
const cors=require("cors")
const dotenv=require("dotenv")
const userRoutes=require("./routes/User")
const captainRoutes=require("./routes/Captain")
const storeRoutes=require("./routes/Store")
const blockchainRoutes=require("./routes/Blockchain")
const {initializeSocket}=require("./socket")
const orderRoutes=require('./routes/Orders')
const {cloudinaryConnect}=require("./config/Cloudinary")    
const fileUpload = require('express-fileupload');
const paymentRouters=require("./routes/Payments")
dotenv.config()

const PORT=process.env.PORT||4000;

database.connect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(
    cors({
        origin:"*",
    }
    )
)
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
cloudinaryConnect();

app.use("/User",userRoutes);
app.use("/Captain",captainRoutes);
app.use("/Store",storeRoutes);
app.use("/Blockchain",blockchainRoutes);
app.use("/Order",orderRoutes);
app.use("/payments", paymentRouters);


app.get("/",(req,res)=>{
    return res.json({
        success:true,
		message:'Your server is up and running....'
	});
})
const server=http.createServer(app)
initializeSocket(server)

server.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})