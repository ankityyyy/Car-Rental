import express from 'express';
const router = express.Router();
import { getAllCar,getCarById,addCar,editCarData,deleteCar} from "../controller/carController.js"
import wrapAsync from "../utils/wrapAsync.js"
import {roleMiddleware} from '../middleware/rolebasedMiddleWare.js';
import validate from "../middleware/userMiddleware.js";
import {carAddSchema,updateCarSchema} from "../joiSchema/carJoiSchema.js"


router.get("/",wrapAsync(getAllCar));
router.get("/:id",wrapAsync(getCarById));
router.post('/new',validate(carAddSchema),roleMiddleware("admin", "owner"),wrapAsync(addCar));
router.put("/:id",validate(updateCarSchema),roleMiddleware("admin", "owner"),wrapAsync(editCarData));
router.delete("/:id",roleMiddleware("admin", "owner"),wrapAsync(deleteCar))

export default router;