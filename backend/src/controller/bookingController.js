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