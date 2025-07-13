import express from "express";
const router=express.Router();
import { registerUser,loginUser } from "../controller/user.js";
import wrapAsync from "../utils/wrapAsync.js"


router.post("/register",wrapAsync(registerUser))
router.post("/login",wrapAsync(loginUser));

export default router;