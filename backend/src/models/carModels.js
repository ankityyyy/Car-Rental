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
  pricingType: {
    type: String,
    enum: ["perDay", "perKm", "custom"],
    required: true,
  },
  
  pricePerDay: {
    type: Number, 
  },
  pricePerKm: {
    type: Number, 
  },
  customPrice: {
    type: Number, 
  },
  availability: {
    type: Boolean,
    default: true,
  },
  seats: {
    type: Number,
    default: 4,
  },
  fuelType: {
    type: String,
    enum: ["petrol", "diesel", "electric"],
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
  image: {
    filename: { type: String },
    url: { type: String,default:"uploads/default.jpg" },
  },
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