import mongoose from "mongoose";

const bookingSchema=new mongoose.Schema({
     userId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User",
            required: true
  },
  carId: {
  type: mongoose.Schema.Types.ObjectId, 
  ref: "Car",
  required: true
},

  startDate:{
   type: Date,
     required:true,

  },
  endDate:{
    type: Date,
    
  },
  totalDays:{
      type:Number,
    
  },
  pickupTime:{
    type: Date,
     required:true,
  },
  dropoffTime:{
    type: Date 

  },
  pickupLocation:{
     type:String,
     required:true

  },
  dropoLocation:{
      type:String,
     required:true


  },
  startKm:{
     type:Number,
     required:true,
     default:0,

  },
  actualKm:{
      type:Number,

  },

  pricingType: {
    type: String,
    enum: ["perDay", "perKm", "custom"],
    required: true
  },
  couponUsed: {
  type: String, 
  default: null
},

  priceBeforeDiscount: {
    type: Number,
    required: true
  },
  discountAmount: {
    type: Number,
    default: 0
  },
  walletUsed: {
    type: Number,
    default: 0
  },
  

  finalPrice: {
    type: Number,
    required: true
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },
  paymentId: {
  type: String 
},

invoiceUrl: {
  type: String 
},


  bookingStatus: {
  type: String,
  enum: ["pending", "confirmed", "completed", "cancelled"],
  default: "pending"
},
     
},{ timestamps: true })

const booking=mongoose.model("Booking",bookingSchema);

export default booking;