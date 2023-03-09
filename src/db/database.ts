import mongoose from "mongoose";

export const connect = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  return mongoose.connect(process.env.MONGO_URI!);
};
