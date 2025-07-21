import express from 'express';
const router=express.Router();
import { allBooking} from "../controller/carController.js"
import wrapAsync from "../utils/wrapAsync.js";
import {roleMiddleware} from '../middleware/rolebasedMiddleWare.js';
import {isLogin} from "../middleware/isLogin.js"
import validate from "../middleware/userMiddleware.js";


router.get('/',isLogin,roleMiddleware("admin"),wrapAsync(allBooking));

export default router;