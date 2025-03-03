
const model=require("../Models/register.user");
const jobModel=require("../Models/JobUpload.js")
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


const updateUserProfile=async (req,res)=>{
   
    try {
        if(!req.user){
        return res.status(401).json({message:'user is not login',success:false});
        }
        const userId = req.user._id;
        const {username,Industary,Experience,About,skills,email,Number}=req.body;
        let result=null;
         if(req.file){
            result=await cloudinary.uploader.upload(req.file.path);
         }
        
        const updatedUser = await model.findByIdAndUpdate(userId, {username,Industary,Experience,About,
            skills:skills.split(" ")
            ,email,Number,
            file:result?result.secure_url:req.user.file
        }, { new: true });
    
        if (!updatedUser) {
            console.log("user not found")
          return res.status(404).json({ message: "User not found" });
        }
    console.log(updatedUser)
        res.status(200).json({ message: "Profile updated successfully", user: updatedUser ,success:true});
      } catch (error) {
        res.status(500).json({ message: "Error updating profile", error });
      }
}

const uploadResume=async(req,res)=>{
    try {
        if(!req.file){
          return res.status(401).json({message:"please input the file",success:false});
        }
        const result = await cloudinary.uploader.upload(req.file.path, {  format: "pdf", });
        const updatedUser = await model.findByIdAndUpdate(
            req.user._id,
            { Resume: result.secure_url },
            { new: true }
          );
          return res.status(200).json({
            message: "Resume uploaded successfully",
            success: true,
            data: result.secure_url,
          })
    } catch (error) {
        console.log("something went wrong while uploading the resume",error);
    }
}


const Applyjob =async (req,res)=>{
 try {
    const id=req.params.id;
        if(!req.user){
            return res.status(401).json({message:"you are not registered",success:false});
        }
            
    const user = await model.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const job = await jobModel.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    await model.updateOne(
      { _id: req.user._id },
      { $push: { Apply: id } } 
    );

    await jobModel.updateOne(
      { _id: id },
      { $push: { UserApplied: req.user._id } } 
    );
        return res.status(200).json({message:"job apply successfully",success:true,id:{id}});
 } catch (error) {
    console.log("something went wrong while applying to the job",error);
 }
}



module.exports ={
    register,
    login,
    updateUserProfile,
    uploadResume,
    Applyjob
}

