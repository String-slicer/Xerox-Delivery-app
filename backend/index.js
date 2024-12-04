const express = require('express')
const app= express();

const database=require("./config/database")

const cookieParser =require("cookie-parser")
const cors=require("cors")
const dotenv=require("dotenv")
const userRoutes=require("./routes/User")
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
app.use("/Blockchain",blockchainRoutes);
app.get("/",(req,res)=>{
    return res.json({
		success:true,
		message:'Your server is up and running....'
	});
})

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})