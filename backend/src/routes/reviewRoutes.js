import express from 'express';
const router = express.Router();
import {getReviewByCarId} from "../controller/reviewController.js"
import wrapAsync from "../utils/wrapAsync.js"
import {roleMiddleware} from '../middleware/rolebasedMiddleWare.js';
import validate from "../middleware/userMiddleware.js";


router.get("/:carId",wrapAsync(getReviewByCarId));