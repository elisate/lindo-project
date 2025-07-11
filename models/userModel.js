// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false, // Make optional for OAuth
    },
    gender: {
      type: String,
      required: false, // Make optional for OAuth
    },
    role: {
      type: String,
      required: true,
      enum: ["vendor", "user"],
      default: "user",
    },
    image: {
      type: Array,
      required: false,
    },
    tokens: {
      accessToken: { type: String },
      refreshToken: { type: String },
    },
    verified: { type: Boolean, default: false },
    newPassword: {
      type: String,
      required: false,
      select: false,
    },
    otp: {
      type: String,
      required: false,
    },
    resetPasswordToken: { type: String, required: false },
    resetPasswordExpires: { type: Date, required: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
