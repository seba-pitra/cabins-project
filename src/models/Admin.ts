import { Schema, model } from "mongoose";
import { Admin } from "@/interfaces/Admin";

//Schema to "Admin" entitie
const adminSchema = new Schema<Admin>({
  email:    { type: String, required: true },
  type:     { type: String, required: true },
  name:     { type: String, required: true },
  password: { type: String, required: true }
});

// Create entitie in DB
const Admin = model<Admin>('Admin', adminSchema);

export default Admin;