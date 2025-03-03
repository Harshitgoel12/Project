//writeFileSync //appendFileSync  //renameSync //unlinkSync //readFileSync

//asynchornous programming
//readFile //renameFile //unlink //writeFile //appendFile

//now i am gone to create a server

const express = require("express");
const path = require("path");
const app =express();
app.get("/",(req,res)=>{
  res.download(path.join(__dirname+"/index.js"))
}).listen(4000)