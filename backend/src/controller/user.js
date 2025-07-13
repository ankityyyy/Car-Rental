import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import ExpressError from "../utils/ExpressError.js"
import bcrypt from "bcrypt";

export const registerUser = async (req, res, next) => {
  let { name, password, phone, email, role } = req.body;
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    return next(new ExpressError("User already exists", StatusCodes.CONFLICT));
  }

  let hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    phone, 
    password: hashedPassword,
    provider: "local",
    role,
  });

  await user.save();
  return res.status(StatusCodes.CREATED).json({ message: "User Registered" });
};

export const loginUser=async(req,res,next)=>{
     let { password, email } = req.body;
     const  foundUser= await User.findOne({email});
        if (!foundUser) {
            return next(new ExpressError( "Username is wrong",StatusCodes.NOT_FOUND));
          }

           const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
              if (!isPasswordCorrect) {
               return next(new ExpressError( "Password is worng",StatusCodes.NOT_FOUND));
             }
          
            //  const token = crypto.randomBytes(20).toString("hex");
            //    foundUser.token = token;

            const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });               
             
          
               return res.status(StatusCodes.OK).json({ token ,id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role})

}