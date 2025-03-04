const mongoose=require("mongoose");

const JobSchema= new mongoose.Schema({
    ComponyName:{
        type:String,
        required:true,
    },
    Title:{
        type:String,
        required:true,
    },
    Description:{
        type:String,
        require:true
    },
    Requirements:{
        type:String,
        required:true,
    },
    skills:{
        type:[String],
        required:true,
    },
    Salary :{
       type: String,
       required:true,
    },
    Location :{
        type:[String],
        required:true,
    },

    JobType:{
        type:String,
        required:true,
    },
    Position :{
        type:Number,
        required:true,
    },
    logo:{
        type:String,
        required:true,
    },
    PostedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"registeruser",
        required:true,
    },
    UserApplied:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"registeruser"
    }

})
const model=mongoose.model("PostJob",JobSchema);
module.exports =model;