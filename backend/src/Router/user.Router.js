const express=require("express");
const router=express.Router();
const controllers=require("../Controllers/user")
const isAuthenticated=require("../middleware/authentication")

const multer = require("multer");
const path=require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,"./../picture"))
    },
    filename: function (req, file, cb) {
      
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split('/')[1])
    }
  })
  router.use(express.json()); 
router.use(express.urlencoded({ extended: true })); 
  const upload = multer({ storage: storage })
console.log(controllers.register)
router.route("/register").post(upload.single("file"),controllers.register);
router.route("/login").post(controllers.login);

module.exports= router;