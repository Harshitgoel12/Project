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
    }
})

module.exports = mongoose.model("registeruser",Schema);
