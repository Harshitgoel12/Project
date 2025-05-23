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
recruiterRouter.route("/AllAppliedUser").get(isAuthenticated,xyz.AllAppliedUser);
recruiterRouter.route("/ViewUserProfile/:id").get(isAuthenticated,abc.ViewUserProfile);
recruiterRouter.route("/AppliedUser/:id").get(isAuthenticated,abc.AppliedUserForParticularJob);
recruiterRouter.route("/Shortlising").put(isAuthenticated,abc.handleShortlist);
recruiterRouter.route("/LatestJob").get(xyz.LatestJob);
module.exports =recruiterRouter;