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

module.exports= router;