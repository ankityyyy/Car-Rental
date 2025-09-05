import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  
  
  pricePerDay: { type: Number, required: true },
  pricePerKm: { type: Number, required: true },
  customPrice: { type: Number, required: true },
  
  availability: {
    type: Boolean,
   enum: ["available", "booked", "maintenance"],
  default: "available",
  },
  seats: {
    type: Number,
    default: 5,
    min: 2,
  max: 8,
  },
  fuelType: {
    type: String,
    enum: ["petrol", "diesel", "electric", "hybrid", "cng"],
    required: true,
  },
  transmission: {
    type: String,
    enum: ["manual", "automatic"],
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    address: String,
    city: String,
    state: String,
    country: String,
  },
  image: [
  {
    filename: String,
    url: { type: String, default: "uploads/default.jpg" },
  },
],
  owner:{
    
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
       required: true,
  }
  },
   {
  timestamps: true,
   });

   const car=mongoose.model('Car',carSchema);
   export default car;