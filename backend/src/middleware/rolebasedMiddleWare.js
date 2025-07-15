import User from "../models/user.js";
import {  StatusCodes } from "http-status-codes";
import ExpressError from "../utils/ExpressError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const roleMiddleware = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const token = req.body?.token || req.query?.token || req.headers.authorization?.split(" ")[1];

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

      if (!allowedRoles.includes(foundUser.role)) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: "Access denied" });
      }

      req.user = foundUser; 
      next();
    } catch (err) {
      console.error(err);
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid or expired token" });
    }
  };
};
