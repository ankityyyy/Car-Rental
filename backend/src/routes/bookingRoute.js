import express from 'express';
const router=express.Router();
import { allBooking,allBookofCar,getBookingOfToday,getUserBookings, addUserBooking,updateBooking,deleteBooking } from "../controller/bookingController.js"
import wrapAsync from "../utils/wrapAsync.js";
import {roleMiddleware} from '../middleware/rolebasedMiddleWare.js';
import {isLogin} from "../middleware/isLogin.js"
import validate from "../middleware/userMiddleware.js";
import {checkCar, checkUser} from '../middleware/reviewMiddleware.js';


router.route("/") 
.get(isLogin,roleMiddleware("admin"),wrapAsync(allBooking));
 router.get("/userBooking",isLogin,checkUser,wrapAsync(getUserBookings))
 router.get("/carBooking",isLogin,checkCar,wrapAsync(allBookofCar))
router.route("/:id")
.get(isLogin,checkCar,wrapAsync(getBookingOfToday))
.post(isLogin,checkCar, checkUser,wrapAsync(addUserBooking))
.patch(isLogin,checkUser,wrapAsync(updateBooking))
.delete(isLogin,checkUser,wrapAsync(deleteBooking ))

//add validate in post and patch

export default router; 