import express from "express";
import { register, googleLogin } from "./controller.js";

const router = express.Router();

// 📝 Register
router.post("/register", register);

// 🔐 Google Login
router.post("/google", googleLogin);

export default router;