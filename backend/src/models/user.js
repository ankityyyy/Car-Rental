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
      if (!v && this.provider === "google") return true; 
      return /^\d{10}$/.test(v); 
    },
    message: (props) =>
      `${props.value} is not a valid 10-digit phone number!`
  },
  required: function () {
    return this.provider === "local";
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
  },
  profilePictureimage: {
    filename: { type: String },
    url: { type: String, default:"uploads/default.jpg"},
  },
  walletBalance: {
    type: Number,
    default: 0
  },

}, {
  timestamps: true 
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
