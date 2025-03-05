const model=require("../Models/JobUpload");
const usermodel=require("../Models/register.user")
const getDetails=async(req,res)=>{ 
   try {
     const {id}=req.params;
     console.log(id);
     const data = await model.findById(id); 
     if(!data){
      res.status(401).json({message:"something went wrong while find the job",success:false})
     }
       return res.status(200).send({message:"getting data of particular job is successful",success:true,data
       })
   } catch (error) {
    console.log("something went wrong while getting details form a particular job",error);
    
   }
}

const ViewUserProfile= async(req,res)=>{
  try {
      const id=req.params.id;
      const data=await usermodel.findById(id);
      if(!data){
        return res.status(401).json({message:"user is not exists",success:false})
      }
      return res.status(200).json({message:"user data fetch successfully",success:true,
        data:{data}
      })
  } catch (error) {
    console.log("something went wrong while getting detail of user",error)
  }
}

const AppliedUserForParticularJob= async(req,res)=>{
 try {
      const id=req.params.id;
       const data=await model.findById(id).populate("UserApplied");

       return res.status(200).json({message:"user data fetch successfully",success:true,result:data.UserApplied,jobId:id})
 } catch (error) {
  console.log("something went wrong while fetching data of all user applied for job",error)
 }
}

module.exports ={getDetails,ViewUserProfile,AppliedUserForParticularJob}