import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/database/db.js";

dotenv.config();

const app = express();
const PORT = 5000;

await connectDB()

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});