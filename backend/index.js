const express = require('express')
const app= express();
const http =require("http");
const server=http.createServer(app)
const database=require("./config/database")

const cookieParser =require("cookie-parser")
const cors=require("cors")
const dotenv=require("dotenv")
const userRoutes=require("./routes/User")
const captainRoutes=require("./routes/Captain")
const storeRoutes=require("./routes/Store")
const blockchainRoutes=require("./routes/Blockchain")
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
app.use("/User",userRoutes);
app.use("/Captain",captainRoutes);
app.use("/Store",storeRoutes);
app.use("/Blockchain",blockchainRoutes);
app.get("/",(req,res)=>{
    return res.json({
		success:true,
		message:'Your server is up and running....'
	});
})

server.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})