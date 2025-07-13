import express from "express";
const router=express.Router();
import { registerUser,loginUser } from "../controller/user.js";
import wrapAsync from "../utils/wrapAsync.js"
import validate from "../middleware/userMiddleware.js";
import {userSchemaReigster,userSchemaLogin } from "../joiSchema/user.js"


router.post("/register",validate(userSchemaReigster),wrapAsync(registerUser))
router.post("/login",validate(userSchemaLogin),wrapAsync(loginUser));

export default router; 