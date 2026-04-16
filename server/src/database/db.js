import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error(
      "MongoDB Connection Error: Missing MONGO_URI (or MONGODB_URI) in environment variables."
    );
    console.error(
      "Create `server/.env` and set MONGO_URI=<your_mongodb_connection_string>."
    );
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected Successfully! : ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;