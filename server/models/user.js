import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  city: String,
  country: String,
  profilePhoto: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;