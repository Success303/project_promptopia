import mongoose from "mongoose";

let isConnected = false; // track connection to database

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  mongoose.set("debug", true);

  if (isConnected) {
    console.log("Mongoose has been successfully connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      serverSelectionTimeoutMS: 50000,
    });
  } catch (error) {
    console.log(error);
  }
};
