import express from 'express';
const router = express.Router();
import { getAllCar,getCarById,addCar} from "../controller/carController.js"
import wrapAsync from "../utils/wrapAsync.js"
import {roleMiddleware} from '../middleware/rolebasedMiddleWare.js';


router.get("/",wrapAsync(getAllCar));
router.get("/:id",wrapAsync(getCarById));
router.post('/new',roleMiddleware("admin", "owner"),wrapAsync(addCar));

export default router;