import mongoose from 'mongoose';

const reviewSchema=new mongoose.Schema({
     userId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User",
            required: true,
     },
     carId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Car",
            required: true,
     },
     review:{
          type:String,
          required:true,
     },
     rating:{
          type:Number,
           min: 1,
        max: 5,

     }
},
{
  timestamps: true 
})

const review=mongoose.model("Review",reviewSchema);

export default review;