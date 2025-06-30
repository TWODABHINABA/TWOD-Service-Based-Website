const mongoose=require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DB_URL || "mongodb+srv://tstatai02:iamf00L@twod.bh7wxgv.mongodb.net/",{
});

const db=mongoose.connection

db.on("connected",()=>{
    console.log("Connected to MongoDB");
});

db.on("error",(err)=>{
    console.log("Error to MongoDB",err);
});

db.on("disconnected",()=>{
    console.log("Disconnected to MongoDB");
});
module.exports=db