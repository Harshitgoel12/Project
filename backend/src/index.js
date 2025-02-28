const DB_Connect=require("./DB_Connection")
const express = require("express");
const recruiterRouter=require("./Router/recruterTask")
const cors = require("cors");
require("dotenv").config();
const app = express();
const router=require("./Router/user.Router")
const cookieParser=require("cookie-parser")

const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cookieParser());
app.use(cors(corsOptions));
DB_Connect().then((res)=>{
console.log("connected to database successfully")
app.listen(3000,()=>{
    console.log("server is listen on port number",3000);
})

}).catch((err)=>{
    console.log("something went while connected to the database",err);
})


app.use("/api",router);
app.use("/api",recruiterRouter);

