const express=require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser=require("body-parser");
const userRoutes = require("./Routes/userRoutes");
const requestRoutes = require("./Routes/requestRoutes");
const adminRoutes = require("./Routes/adminRoutes");

require("dotenv").config()

const db = require("./utils/db");

const app=express();


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", userRoutes);
app.use("/", requestRoutes);
app.use("/admin", adminRoutes);

const allowedOrigins = [
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


const PORT=process.env.PORT || 5001;


app.get("/get",(req,res)=>{
    res.send("YOU are IN")
    res.end()
});
app.listen(PORT,()=>{
    console.log(`Server Running in http://localhost:${PORT}`);
});