const jwt=require("jsonwebtoken");
const model=require("../Models/register.user")

const isAuthenticated = async(req,res,next)=>{
      try {
         const gettoken=req.body.token||req.cookies.token||(req.headers.authorization && req.headers.authorization.split(" ")[1]);
         if(!gettoken){
          return res.status(401).json({message:"something went wrong",success:false,});
         }
        const decodetoken= await jwt.verify(gettoken,"fjalsdjflaksjgdkadfjgkhsdkjfhgkjdshfgkhdfjkhg");
         const user= await model.findOne({_id:decodetoken._id});
         if(!user){
          return res.status(401).json({message:"user is not registered",success:false});
         }
         req.user=user;
         next();
      } catch (error) {
        console.log("something went wrong while authenticated the user " +error);
        return;
      }
}
module.exports=isAuthenticated;