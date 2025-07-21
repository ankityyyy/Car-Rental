import express from "express";
import mongoose from "mongoose";
const app = express();
import dotenv from "dotenv";
dotenv.config();
let dbUrl = "mongodb://127.0.0.1:27017/car";
import ExpressError from "../src/utils/ExpressError.js";
import userRoutes from "../src/routes/user.js";
import { StatusCodes } from "http-status-codes";
import passport from "./config/passport.js";
import googleRoute from "./routes/google.js";
import carRoute from "./routes/carRoutes.js";
import carReviewRoute from "./routes/reviewRoutes.js"
import bookingRoute from "./routes/bookingRoute.js"

async function Main() {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connection successful");
  } catch (err) {
    console.log("MongoDB Connection Error", err);
  }
}

Main();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.get("/",(req,res)=>{
     res.send("it work ");

})

app.use("/user/v1/api", userRoutes);
app.use("/user/v1/api",googleRoute);
app.use("/car/v1/api",carRoute);
app.use("/car/review/v1/api",carReviewRoute);
app.use("/car/booking/v1/api",bookingRoute);

app.use((req, res, next) => {
  next(new ExpressError("page not found", StatusCodes.BAD_REQUEST));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  res.status(statusCode).json({ message });
});

app.listen("2000", (req, res) => {
  console.log("app is listen on port no :2000");
});
