import express from 'express';
const router = express.Router();
import { getAllCar,getCarById,addCar,editCarData,deleteCar} from "../controller/carController.js"
import wrapAsync from "../utils/wrapAsync.js"
import {roleMiddleware} from '../middleware/rolebasedMiddleWare.js';
import validate from "../middleware/userMiddleware.js";
import {carAddSchema} from "../joiSchema/carJoiSchema.js"


router.get("/",wrapAsync(getAllCar));
router.get("/:id",wrapAsync(getCarById));
router.post('/new',validate(carAddSchema),roleMiddleware("admin", "owner"),wrapAsync(addCar));
router.put("/:id",wrapAsync(editCarData));
router.delete("/:id",wrapAsync(deleteCar))

export default router;