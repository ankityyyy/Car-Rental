import ExpressError from "../utils/ExpressError.js";
import { StatusCodes } from "http-status-codes";

const validate=(schema)=>{

     return (req,res,next)=>{
          let {error}=schema.validate(req.body);
          if(error){
              const errMsg=error.details.map((err)=>err.message).join(", ");
              throw new ExpressError(errMsg,StatusCodes.BAD_REQUEST);
          }
          next()

     }
}

export default validate;