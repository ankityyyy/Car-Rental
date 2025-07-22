import express from 'express';
const router = express.Router();
import {getReviewByCarId,addReview,updateReview,deleteReview} from "../controller/reviewController.js"
import wrapAsync from "../utils/wrapAsync.js"
import {checkCar, checkUser} from '../middleware/reviewMiddleware.js';
import validate from "../middleware/userMiddleware.js";
import {reviewJoiSchema,updateReviewJoiSchema} from "../joiSchema/reviewJoiSchema.js"


router.route("/:id")
.get(checkCar,wrapAsync(getReviewByCarId))
.post(checkCar,checkUser,validate(reviewJoiSchema),wrapAsync(addReview))
.patch( checkUser,validate(updateReviewJoiSchema),wrapAsync(updateReview))
.delete(checkUser,wrapAsync(deleteReview))

export default router;