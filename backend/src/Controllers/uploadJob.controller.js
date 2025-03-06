const model=require("../Models/JobUpload");
const cloudinary=require("../utils/cloudinary")

const jobUploadHandler=async(req,res)=>{
    
try {
      const {ComponyName,Title,Description,Requirements,skills,Salary,Position,Location,JobType} = req.body;
      if(!ComponyName||!Title||!Description||!skills||!Requirements||!Salary||!Location||!JobType||!Position){
         return res.status(401).json({message:"please fill all the details",success:false});
      }
    const logo=req.file;
    if(!logo){
        return res.status(401).json({message:"file is required", success:false}); 
    }
        const result=await cloudinary.uploader.upload(logo.path);
        if(!result){
            return res.status(401).json({message:"enable to upload the data on cloudinary", success:false});
        }
        const obj=await model.create({
    ComponyName,Title,Description,skills:skills.split(' '),
    Requirements,Salary,Position,Location:Location.split(' '),JobType,logo:result.secure_url,PostedBy:req.user._id
        })
        
        res.status(200).json({message:"job posted successfully",obj,success:true});


} catch (error) {
    console.log("something went wrong when posting a job",error);
}
}
const Myjobcontrolelr=async(req,res)=>{
    try {
        if(!req.user){
       return res.status(401).json({message:"user is not login",success:false});
        }
        
        const data=await model.find({PostedBy:req.user._id});
        return res.status(200).send({message:"we send all the data",success:true,data});
    } catch (error) {
        console.log("something went wrong when we get data from myjob",error)
    }
}
const AllJobController=async(req,res)=>{
    try {
        console.log("lo ji yha tk to aa gye")
        const data=await model.find({});
        return res.status(200).send({message:"we send all the data",success:true,data});
    } catch (error) {
        console.log("something went wrong when we get data from myjob",error)
    }
}



const AllAppliedUser=async(req,res)=>{
    try {
        if(!req.user){
            return res.status(401).json({message:"please login",success:false});
        }
        const data = await model.find({ PostedBy: req.user._id }).populate("UserApplied");
    
        return res.status(200).json({message:"fetching all user successfully",success:true,data:{data}});
    } catch (error) {
        console.log("something went wrong while getting all user's data",error);
    }
}


const LatestJob= async(req,res)=>{
    try {
        console.log("yha tk to aa gye ji")
      const data= await model.find({}).limit(8);
      return res.status(200).json({message:"successfully fetching data",success:true,data});
    } catch (error) {
        console.log("something went wrong while fetching latest jobs",error)
    }
}



module.exports={jobUploadHandler,Myjobcontrolelr,AllJobController,AllAppliedUser,LatestJob}