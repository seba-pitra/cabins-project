import { Admin } from "@/interfaces/Admin";
import { Schema, model } from "mongoose";

const adminSchema = new Schema<Admin>({
  email:    { type: String, required: true },
  type:     { type: String, required: true },
  name:     { type: String, required: true },
  password: { type: String, required: true }
});

const Admin = model<Admin>('Admin', adminSchema);

export default Admin;