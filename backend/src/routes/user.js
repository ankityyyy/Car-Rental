import express from "express";
const router=express.Router();
import { registerUser,loginUser,addProfileImage } from "../controller/user.js";
import wrapAsync from "../utils/wrapAsync.js"
import validate from "../middleware/userMiddleware.js";
import {userSchemaReigster,userSchemaLogin } from "../joiSchema/user.js"
import {isLogin} from "../middleware/isLogin.js"
import multer from "multer";
import {storage} from "../config/cloudinary.js";
const upload = multer({ storage});


router.post("/register",validate(userSchemaReigster),wrapAsync(registerUser))
router.post("/login",validate(userSchemaLogin),wrapAsync(loginUser));
 router.post("/addProfile",upload.single("image"), isLogin, wrapAsync(addProfileImage));
 

export default router; 