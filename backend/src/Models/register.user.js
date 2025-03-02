const mongoose=require("mongoose");

const Schema= new mongoose.Schema({
    username:{
        type:String,
        required:[true,"this field is compalsary"],
    },
    email:{
       type:String,
       required:[true,"email is required"],
       unique:true
    },
    Number:{
       type:String,
       required:[true,"phone number is required"],
    },
    Password:{
        type:String
    },
    role:{
        type:String,
        enum:["student","recruiter"]
    },
    file:{
        type:String,
    },

        Industary:{type:String,default:"NA"},
        Experience:{type:String,default:"NA"},
        About:{type:String,default:"NA"},
        skills:{type:[String],default :["NA"]},
        LinkedIn :{type:String,default:"NA"},
        Github : {type:String,default:"NA"},
})

module.exports = mongoose.model("registeruser",Schema);
