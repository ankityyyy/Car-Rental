import ExpressError from "../utils/ExpressError";
import { StatusCodes } from "http-status-codes";

const validate=(schema)=>{

     return (req,res,next)=>{
          let {error}=schema.validate(req.body);
          if(error){
              const errMsg=error.map((err)=>err.message).join(", ");
              throw new ExpressError(errMsg,StatusCodes.BAD_REQUEST);
          }
          next()

     }
}

export default validate;