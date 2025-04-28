import { compare } from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const { sign } = jwt;

const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds

const createToken = (email, userId) => {
  return sign({ email, userId }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

export const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, image, color } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      image,
      color,
    });

    res.cookie("jwt", createToken(user.email, user._id), {
      httpOnly: true,
      maxAge: maxAge * 1000, // ms
      secure: true,          // true if HTTPS (for local dev, set false if needed)
      sameSite: "none",      // important for cross-origin cookies
    });

    return res.status(201).json({
      user: {
        email: user.email,
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const auth = await compare(password, user.password);

    if (!auth) {
      return res.status(401).json({ message: "Invalid passeord" });
    }

    res.cookie("jwt", createToken(user.email, user._id), {
      httpOnly: true,
      maxAge: maxAge * 1000, // ms
      secure: true,          // true if HTTPS (for local dev, set false if needed)
      sameSite: "none",      // important for cross-origin cookies
    });

    return res.status(200).json({
      user: {
        email: user.email,
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    console.log("req.userId", req.userId);
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      // user: {
        email: userData.email,
        id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
        color: userData.color,
        profileSetup: userData.profileSetup,
      // },
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}
