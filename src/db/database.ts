import mongoose from "mongoose";

const database = mongoose
  .connect("mongodb://localhost:27017/cabins")
  .catch((e) => console.error(e));

export default database;
