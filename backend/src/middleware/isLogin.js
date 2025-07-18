import User from "../models/user.js"
import { StatusCodes } from "http-status-codes";
import ExpressError from "../utils/ExpressError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const getToken = (req) =>(
  req.body?.token ||
  req.query?.token ||
  req.headers.authorization?.split(" ")[1]
)

export const isLogin=async(req,res,next)=>{

     
     try {
          const token=getToken(req);
          

          if(!token){
               return next(new ExpressError("Token is missing", StatusCodes.BAD_REQUEST))
          }

          let decoded=jwt.verify(token, process.env.JWT_SECRET);
          let foundUser=await User.findById(decoded.id);

          if(!foundUser){
               return next(new ExpressError("User not authenticated", StatusCodes.UNAUTHORIZED))
          }

           req.user = foundUser; 
      next();
          
     } catch (error) {
           return res
                  .status(StatusCodes.UNAUTHORIZED)
                  .json({ message: "Invalid or expired token" });
              }
          
     
}