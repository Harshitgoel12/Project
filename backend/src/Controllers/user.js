
const model=require("../Models/register.user")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const cloudinary=require("../utils/cloudinary")
const register = async (req, res) => {
    try {
        const { username, email, Number, password, role } = req.body;
        console.log(role);
        const file = req.file;
 if(!username||!email||!Number||!password){
    return res.status(401).json({message:"please fill all the details", success:false});
 }
        if (!file) {
            return res.status(400).send("No file uploaded");
        }
        const result=await cloudinary.uploader.upload(file.path);
        const user = await model.findOne({ email });
        if (user) {
            console.log("user already exists")
            return res.status(401).json({ message: "User already exists", success: false });
        }
        console.log("no user exists")
        const Password =await bcrypt.hash(password,10);

  await model.create({
            username,
            email,
            Number,
            Password, 
            role,
            file: result.secure_url
        });
        res.status(200).json({ message: "User is registered successfully", success: true });
    } catch (error) {
        console.error("Something went wrong in register API", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

const login=async (req,res)=>{
   try {
     const {email,password,role}=req.body;
     console.log(email ,password )
  if(!email||!password){
     return res.status(401).json({message:"please fill all the details ",success:false});
  }
      const user= await model.findOne({email});
      if(!user){
         return res.status(401).json({message:"user is not registered",success:false});
      }
   
      //generate access token
    
      const token=await jwt.sign({_id:user._id},"fjalsdjflaksjgdkadfjgkhsdkjfhgkjdshfgkhdfjkhg",{
         expiresIn:"1d"
      });
     
      res.status(200).cookie("token",token,{
         expiresIn:'1d'
      }).send({message:"user login successfully",success:true,user})
 
   } catch (error) {
    res.status(404).send({message:"something went wrong while login the user",success:false,error})
   }
  
}
module.exports ={
    register,
    login
}

