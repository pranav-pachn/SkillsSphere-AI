import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
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
      required: false, // ✅ FIXED
    },

    role: {
      type: String,
      enum: ["student", "tutor", "recruiter"],
      default: "student",
    },

    provider: {
      type: String,
      default: "local", // local or google
    },

    profilePic: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;