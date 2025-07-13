import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    
    
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
    trim: true
  },
  phone: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); 
      },
      message: (props) =>
        `${props.value} is not a valid 10-digit phone number!`
    }
  },
  provider: {
    type: String,
    default: "local"
  },
  providerId: {
    type: String
  },
  role: {
    type: String,
    enum: ["admin", "owner", "customer"],
    default: "customer"
  }
}, {
  timestamps: true 
});

const User = mongoose.model("User", userSchema);
export default User;
