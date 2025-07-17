import review from "../models/reviewModels";
import { StatusCodes } from "http-status-codes";
import ExpressError from "../utils/ExpressError.js";


// export const getAllReview=async(req,rew,next)=>{
//      let allReview=await review.find({});
     
//      if(!allReview){
//         return  next(new ExpressError("no review found",StatusCodes.BAD_REQUEST)) 
//      }

//      return res.status(StatusCodes.OK).json({review:allReview,message:"all review fetch from db"});

// }no need for featch all review

export const addReview=async(req,res,next)=>{
     let data=req.body;
    let foundCar= req.car;
     let foundUser=req.user

     const existing = await review.findOne({ userId: foundUser._id, carId: foundCar._id });
  if (existing) {
    return next(new ExpressError("You already reviewed this car", StatusCodes.CONFLICT));
  }

     let newReview=new review({
           userId:foundUser._id,
            carId:foundCar._id,
            review:data.review,
            rating:data.rating,

     })

    await newReview.save()

    return res.status(StatusCodes.CREATED).json({message:"review add successfully"})
}

export const getReviewByCarId=async(req,res,next)=>{
     // let {id}=req.params;
     let foundCar= req.car;

     let carReviews=await review.find({carId:foundCar._id}).populate("UserId","name")
     if (!carReviews || carReviews.length === 0) {
      return next(new ExpressError("No reviews found for this car", StatusCodes.NOT_FOUND));
    }

    return res.status(StatusCodes.OK).json({
      reviews: carReviews,
      message: "Fetched all reviews for this car",
    });
}