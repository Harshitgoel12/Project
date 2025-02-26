const mongoose= require("mongoose");
require("dotenv").config()
 async function connect_DB(){
         try{
            const data=await mongoose.connect(`${process.env.DB_URL||"mongodb://127.0.0.1:27017"}/jobportal`);
         }
         catch(err){
            console.log("something went wrong ",err)
         }
}
module.exports =connect_DB;
