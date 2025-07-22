import booking from '../models/bookingSchema.js';
import { StatusCodes } from "http-status-codes";
import ExpressError from "../utils/ExpressError.js";
import moment from "moment";

export const allBooking = async (req, res, next) => {
  
    const startOfDay = moment().startOf("day").toDate();
    const endOfDay = moment().endOf("day").toDate();

    const allBookingToday = await booking.find({
      startDate: { $gte: startOfDay, $lte: endOfDay }
    })
    .populate("userId", "name email")
    .populate("carId", "title brand model");

    return res.status(200).json({
      count: allBookingToday.length,
      bookings: allBookingToday,
      message: "Today's bookings fetched successfully"
    });
  
};

export const allBookofCar=async(req,res,next)=>{
   let foundCar= req.car;
  let bookings=await booking.find({carId:foundCar._id}).populate("carId", "title brand model");

  if (bookings.length === 0) {
  return next(new ExpressError("No bookings found for this car", StatusCodes.NOT_FOUND));
}

  return res.status(StatusCodes.OK).json({bookings, count:bookings.length,message:"featch all booking for this car"})
}

export const getBookingOfToday= async (req, res, next) => {
  let foundCar= req.car;
  
    const startOfDay = moment().startOf("day").toDate();
    const endOfDay = moment().endOf("day").toDate();
    console.log("Today Start:", startOfDay);
console.log("Today End:", endOfDay);


    const bookingsToday = await booking.find({
      startDate: { $gte: startOfDay, $lte: endOfDay },
      carId: foundCar._id
    })
    .populate("userId", "name email")
    .populate("carId", "title brand model");

    return res.status(200).json({
      count: bookingsToday.length,
      bookings:bookingsToday,
      message: "Today's bookings for this car fetched successfully"
    });
  
};

export const getUserBookings = async (req, res, next) => {
  const foundUser = req.user;

  const myBookings = await booking.find({ userId: foundUser._id })
    .populate("userId", "name email")
    .populate("carId", "title brand model");

  if (!myBookings || myBookings.length === 0) {
    return next(new ExpressError("No bookings found for this user", StatusCodes.NOT_FOUND));
  }

  return res.status(StatusCodes.OK).json({
    count: myBookings.length,
    bookings: myBookings,
    message: "Fetched all bookings for this user"
  });
};



export const addUserBooking = async (req, res, next) => {
  
    const foundUser = req.user;
    const foundCar = req.car;
    const data = req.body;

   
    const startOfDay = moment().startOf("day").toDate();
    const endOfDay = moment().endOf("day").toDate();

    const bookingsToday = await booking.findOne({
      startDate: { $gte: startOfDay, $lte: endOfDay },
      carId: foundCar._id,
    });

    if (bookingsToday) {
      return next(
        new ExpressError("Car is already booked today", StatusCodes.BAD_REQUEST)
      );
    }

    
    const day = Math.ceil(
      (new Date(data.endDate) - new Date(data.startDate)) /
        (1000 * 60 * 60 * 24)
    );

    const pricingType = foundCar.pricingType;
    const plannedKm = data.plannedKm || 0;

    
    let priceBeforeDiscount = 0;
    if (pricingType === "perDay") {
      priceBeforeDiscount = foundCar.pricePerDay * day;
    } else if (pricingType === "perKm") {
      priceBeforeDiscount = foundCar.pricePerKm * plannedKm;
    } else if (pricingType === "custom") {
      const match = foundCar.customPrices.find((p) => plannedKm <= p.maxKm);
      priceBeforeDiscount = match ? match.price : 0;
    }

  
    let discountAmount = data.discountAmount || 0;

    
    let walletUsed = 0;
    if (foundUser.walletBalance > 0) {
      walletUsed = Math.min(
        foundUser.walletBalance,
        priceBeforeDiscount - discountAmount
      );
      foundUser.walletBalance -= walletUsed;
      await foundUser.save();
    }

    
    const finalPrice = priceBeforeDiscount - discountAmount - walletUsed;

   
    const newBooking = new booking({
      userId: foundUser._id,
      carId: foundCar._id,
      startDate: data.startDate,
      endDate: data.endDate,
      totalDays: day,
      pickupTime: data.pickupTime,
      dropoffTime: data.dropoffTime,
      pickupLocation: data.pickupLocation,
      dropoLocation: data.dropoLocation,
      startKm: data.startKm || 0,
      actualKm: data.actualKm || 0,
      pricingType,
      priceBeforeDiscount,
      discountAmount,
      walletUsed,
      finalPrice,
      bookingStatus: "pending",
      couponUsed: data.couponUsed || null,
    });

    await newBooking.save();

    return res.status(StatusCodes.CREATED).json({
      booking: newBooking,
      message: "Booking added successfully",
    });
  
};

export const updateBooking = async (req, res, next) => {
  
    const { id } = req.params;
      const foundUser = req.user;
    const bookings = await booking.findById(id);
    if (!bookings) return next(new ExpressError("Booking not found", StatusCodes.NOT_FOUND));
    if (bookings.userId.toString() !== foundUser._id.toString()) {
      return next(new ExpressError("Unauthorized", StatusCodes.FORBIDDEN));
    }

    Object.assign(booking, req.body);
    const updated = await booking.save();
    res.status(StatusCodes.OK).json({ message: "Booking updated", booking: updated });
};


export const deleteBooking = async (req, res, next) => {
    const { id } = req.params;
    const foundUser = req.user;
    const bookings = await booking.findById(id);
    if (!bookings) return next(new ExpressError("Booking not found", StatusCodes.NOT_FOUND));
    if (bookings.userId.toString() !== foundUser._id.toString()) {
      return next(new ExpressError("Unauthorized", StatusCodes.FORBIDDEN));
    }

    await booking.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({ message: "Booking deleted" });
 
};




