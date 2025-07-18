import express from 'express';
const router = express.Router();
import { getAllCar,getCarById,addCar,editCarData,deleteCar} from "../controller/carController.js"
import wrapAsync from "../utils/wrapAsync.js"
import {roleMiddleware} from '../middleware/rolebasedMiddleWare.js';
import {isLogin} from "../middleware/isLogin.js"
import validate from "../middleware/userMiddleware.js";
import {carAddSchema,updateCarSchema} from "../joiSchema/carJoiSchema.js"


router.route("/")
.get(isLogin,wrapAsync(getAllCar));
router.route('/new')
.post(isLogin,validate(carAddSchema),roleMiddleware("admin", "owner"),wrapAsync(addCar));
router.route("/:id")
.get(isLogin,wrapAsync(getCarById))
.patch(isLogin,validate(updateCarSchema),roleMiddleware("admin", "owner"),wrapAsync(editCarData))
.delete(isLogin,roleMiddleware("admin", "owner"),wrapAsync(deleteCar))



export default router;