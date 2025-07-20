import review from "../models/reviewModels.js";
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

     console.log(req.body);

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

     let carReviews=await review.find({carId:foundCar._id}).populate("userId","name")
     if (!carReviews || carReviews.length === 0) {
      return next(new ExpressError("No reviews found for this car", StatusCodes.NOT_FOUND));
    }

    return res.status(StatusCodes.OK).json({
      reviews: carReviews,
      message: "Fetched all reviews for this car",
    });
}

export const updateReview = async (req, res, next) => {
  const { id } = req.params;
  const { rating, review: text } = req.body;
  const foundUser = req.user;

  const existingReview = await review.findById(id);

  if (!existingReview) {
    return next(new ExpressError("Review not found", StatusCodes.BAD_REQUEST));
  }

  if (existingReview.userId.toString() !== foundUser._id.toString()) {
    return next(new ExpressError("Unauthorized", StatusCodes.FORBIDDEN));
  }

  const updatedReview = await review.findByIdAndUpdate(
    id,
    {
      review: text,
      rating,
    },
    { new: true, runValidators: true }
  );

  return res.status(StatusCodes.OK).json({
    review: updatedReview,
    message: "Review updated successfully",
  });
};


export const deleteReview = async (req, res, next) => {
  const {id} = req.params;
  const foundUser = req.user;

  const existingReview = await review.findById(id);

  if (!existingReview) {
    return next(new ExpressError("Review not found ", StatusCodes.BAD_REQUEST));
  }

  if (existingReview.userId.toString() !== foundUser._id.toString()) {
    return next(new ExpressError("Unauthorized", StatusCodes.FORBIDDEN));
  }

  const deletedReview = await review.findByIdAndDelete(id);

  return res.status(StatusCodes.OK).json({
    review: deletedReview,
    message: "Review deleted successfully",
  });
};
