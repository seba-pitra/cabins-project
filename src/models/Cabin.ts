import { Schema, model } from "mongoose";
import { Cabin } from "@/interfaces/Cabin";

//Schema to "Cabin" entitie
const cabinSchema = new Schema<Cabin>({
  amenities:  { type: String, required: true },
  capacity:   { type: String, required: true },
  description:{ type: String, required: true },
  name:       { type: String, required: true },
  price:      { 
                autumn:Number, spring: Number, summer: Number,  winter: Number,  
                required: true
              }
});

// Create entitie in DB
const Cabin = model<Cabin>('Cabin', cabinSchema);

export default Cabin;