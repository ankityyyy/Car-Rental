import User from "../models/user.js";
import review from "../models/reviewModels.js";
import car from "../models/carModels.js";
import { StatusCodes } from "http-status-codes";
import ExpressError from "../utils/ExpressError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const checkCar = async (req, res, next) => {
  try {
    let { id } = req.params;
    let foundCar = await car.findById(id);
    if (!foundCar) {
      return next(
        new ExpressError("carid is missing or wrong", StatusCodes.BAD_REQUEST)
      );
    }

    req.car = foundCar;
    next();
  } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error });
  }
};

const getToken = (req) =>(
  req.body?.token ||
  req.query?.token ||
  req.headers.authorization?.split(" ")[1]
)


export const checkUser=async(req,res,next)=>{
      try {
      const token = getToken(req);

      if (!token) {
        return next(new ExpressError("Token is missing", StatusCodes.BAD_REQUEST));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const foundUser = await User.findById(decoded.id); 

      if (!foundUser) {
        return next(
          new ExpressError("User not authenticated", StatusCodes.UNAUTHORIZED)
        );
      }

      req.user = foundUser; 
      next();
    } catch (err) {
     
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid or expired token" });
    }
}
