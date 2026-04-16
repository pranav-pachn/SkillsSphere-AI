import express from "express";
import { uploadResumeMiddleware } from "../../middleware/uploadResume.js";
import {
  uploadResume,
  analyzeResume,
  getResumeResult
} from "./controller.js";

const router = express.Router();

router.post("/upload", uploadResumeMiddleware, uploadResume);
router.post("/analyze", analyzeResume);
router.get("/result/:id", getResumeResult);

export default router;
