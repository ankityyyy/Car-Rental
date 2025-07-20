import express from 'express';
const router = express.Router();
import {getReviewByCarId,addReview,updateReview,deleteReview} from "../controller/reviewController.js"
import wrapAsync from "../utils/wrapAsync.js"
import {checkCar, checkUser} from '../middleware/reviewMiddleware.js';
import validate from "../middleware/userMiddleware.js";
import {reviewJoiSchema,updateReviewJoiSchema} from "../joiSchema/reviewJoiSchema.js"


router.get("/:id",checkCar,wrapAsync(getReviewByCarId));
router.post("/:id",checkCar,checkUser,validate(reviewJoiSchema),wrapAsync(addReview))
router.patch("/:id", checkUser,validate(updateReviewJoiSchema),wrapAsync(updateReview))
router.delete("/:id",checkUser,wrapAsync(deleteReview))

export default router;