import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: String,
      default: false,
    },

    verificationToken: {
      type: String,
    },

    verificationTokenExpiresAt: {
      type: Date,
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordTokenExpiresAt: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", userSchema);

export default User;
