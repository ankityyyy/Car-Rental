import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import ExpressError from "../utils/ExpressError.js";
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

export const loginUser = async (req, res, next) => {
  let { password, email } = req.body;
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
  throw new ExpressError("Email is not registered", StatusCodes.NOT_FOUND);
}

const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
if (!isPasswordCorrect) {
  throw new ExpressError("Invalid password", StatusCodes.UNAUTHORIZED);
}


  //  const token = crypto.randomBytes(20).toString("hex");
  //    foundUser.token = token;

  const token = jwt.sign({ id:foundUser._id, role:foundUser.role,  name:foundUser.name, email:foundUser.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return res
    .status(StatusCodes.OK)
    .json({
      token,
      id: foundUser._id,
      name:foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    });
};


export const addProfileImage=async(req,res,next)=>{
  if (!req.file) {
      return next(new ExpressError("No file uploaded", StatusCodes.BAD_REQUEST));
    }

    let url = req.file.path;
  let filename = req.file.filename;

  const foundUser = req.user;
   let id=foundUser._id;

  let updateImage= await User.findByIdAndUpdate(id,{profilePictureimage:{ url, filename }},{
    new: true,
    runValidators: true,})
     res.status(StatusCodes.OK).json({
      message: "Profile image updated successfully",
      user: updateImage,
     })

}