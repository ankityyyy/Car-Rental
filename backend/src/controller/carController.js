import car from "../models/carModels.js";
import { StatusCodes } from "http-status-codes";
import ExpressError from "../utils/ExpressError.js";

export const getAllCar = async (req, res, next) => {
  let carData = await car.find({});
  return res
    .status(StatusCodes.OK)
    .json({ car: carData, message: "featch all car" });
};

export const getCarById = async (req, res, next) => {
  const { id } = req.params;
  let showCarById = await car.findById(id);
  if (!showCarById) {
    return next(new ExpressError("Car not found", StatusCodes.BAD_REQUEST));
  }

return res.status(StatusCodes.OK).json({ car: showCarById, message: "Car fetched successfully" });

};

export const addCar = async (req, res, next) => {
  const foundUser = req.user;
  let data= req.body;

  let  carData={
    title:data.title,
    brand:data.brand,
    model:data.model,
     pricingType:data.pricingType,
    availability:data.availability,
    seats:data.seats,
    fuelType:data.fuelType,
    transmission: data.transmission,
    location:{
      type:"Point",
      coordinates:data.coordinates,
      address:data.address,
      city:data.city,
      state:data.state,
      country:data.country,
      lastUpdated: new Date(), 
    },
    owner: foundUser.id,
  };

   if (data.pricePerDay != null) {
      carData.pricePerDay = data.pricePerDay;
    }

    if (data.pricePerKm != null) {
      carData.pricePerKm = data.pricePerKm;
    }

    if (data.customPrice != null) {
      carData.customPrice = data.customPrice;
      carData.customDescription = data.customDescription || "Custom pricing";
    }

    const allowedTypes = ["perDay", "perKm", "custom"];
    if (!allowedTypes.includes(data.pricingType)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid pricingType" });
    }
   
    const newCar = new car(carData);
  const savedCar = await newCar.save();

  return res.status(StatusCodes.CREATED).json({
    message: "New car added successfully",
    car:savedCar,
  });
};


export const editCarData=async(req,res,next)=>{
  let {id}=req.params;
   const foundUser = req.user;

  let foundCar=await car.findById(id);

  if(!foundCar){
    return next(new ExpressError("car is not found", StatusCodes.BAD_REQUEST))
  }

  if(foundUser.role ==="owner" && foundCar.owner.toString()!==foundUser._id.toString()){
    return next(new ExpressError("You are not authorized to update this product",StatusCodes.FORBIDDEN ))
  }

  const updatedCar = await car.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(StatusCodes.CREATED).json({message:"Car updated successfully"})


}