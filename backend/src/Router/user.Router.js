const express=require("express");
const router=express.Router();
const controllers=require("../Controllers/user.controller")
const isAuthenticated=require("../middleware/authentication")
const multer=require("multer")
const storage=require("../middleware/multer")
  router.use(express.json()); 
router.use(express.urlencoded({ extended: true })); 
  const upload = multer({ storage: storage })
console.log(controllers.register)
router.route("/register").post(upload.single("file"),controllers.register);
router.route("/login").post(controllers.login);
router.route("/updateProfile").put(isAuthenticated,upload.single("file"),controllers.updateUserProfile);
router.route("/uploadresume").post(isAuthenticated,upload.single("Resume"),controllers.uploadResume);
router.route("/ApplyJob/:id").put(isAuthenticated,controllers.Applyjob);
router.route("/AppliedJobs").get(isAuthenticated,controllers.AppledJobs);
router.route("/logout").get(isAuthenticated,controllers.logout);
router.route("/ShortlistedCompony").get(isAuthenticated,controllers.ShortlistedCompony);
module.exports= router;