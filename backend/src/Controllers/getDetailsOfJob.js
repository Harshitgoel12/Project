const model=require("../Models/JobUpload")
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
module.exports ={getDetails}