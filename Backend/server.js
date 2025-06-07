const express=require("express");
require("dotenv").config()
const bodyParser=require("body-parser");
const app=express();
const PORT=process.env.PORT || 5001;
app.use(bodyParser.json());

app.get("/get",(req,res)=>{
    res.send("YOU are IN")
    res.end()
});
app.listen(PORT,()=>{
    console.log(`Server Running in http://localhost:${PORT}`);
});