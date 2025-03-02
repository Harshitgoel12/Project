const express=require("express");
const recruiterRouter=express.Router();
const storage =require("../middleware/multer");
const isAuthenticated=require("../middleware/authentication")
const abc=require("../Controllers/getDetailsOfJob")
const multer= require("multer");
const xyz=require("../Controllers/uploadJob.controller")
const upload=multer({storage:storage})
recruiterRouter.route("/postjob").post(upload.single("logo"),isAuthenticated,xyz.jobUploadHandler);
recruiterRouter.route("/myjobs").get(isAuthenticated,xyz.Myjobcontrolelr);
recruiterRouter.route("/Alljobs").get(isAuthenticated,xyz.AllJobController)
recruiterRouter.route("/getDetails/:id").get(isAuthenticated,abc.getDetails);
module.exports =recruiterRouter;