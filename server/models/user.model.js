import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      default: "", // ✅ Not required at signup
    },
    lastName: {
      type: String,
      default: "", // ✅ Not required at signup
    },
    image: {
      type: String,
      default: "", // ✅ Optional
    },
    color: {
      type: Number,
      default: 0, // ✅ Optional (default color 0)
    },
    profileSetup: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
