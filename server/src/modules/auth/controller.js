import { validateRegisterInput } from "../../validations/authValidation.js";
import { registerUserAndIssueToken, verifyGoogleToken } from "./service.js";
import User from "../../database/models/User.js";
import jwt from "jsonwebtoken";

// 📝 Register User
export const register = async (req, res) => {
  const validation = validateRegisterInput(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: "Invalid registration payload",
      errors: validation.errors
    });
  }

  try {
    const authResult = await registerUserAndIssueToken(validation.data);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: authResult.token,
      user: authResult.user
    });
  } catch (error) {
    if (error.code === "USER_ALREADY_EXISTS" || error?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A user with this email already exists"
      });
    }

    if (error.code === "MISSING_JWT_SECRET") {
      return res.status(500).json({
        success: false,
        message: "Server configuration error: JWT secret is missing"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to register user right now"
    });
  }
};

// 🔐 Google Login
export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // ❌ No token provided
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Google token is required",
      });
    }

    // ✅ Verify Google token
    const googleUser = await verifyGoogleToken(token);

    // 🔍 Check if user exists
    let user = await User.findOne({ email: googleUser.email });

    // 🟢 Create new user if not exists
    if (!user) {
      user = await User.create({
        name: googleUser.name,
        email: googleUser.email,
        profilePic: googleUser.picture,
        role: "student", // default role
        provider: "google",
      });
    }

    // 🔐 Generate JWT
    const jwtToken = jwt.sign(
      {
        userId: user._id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    // ✅ Send response
    return res.status(200).json({
      success: true,
      message: "Google login successful",
      token: jwtToken,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Google authentication failed",
    });
  }
};