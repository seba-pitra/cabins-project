import { Model, model, models, Schema } from "mongoose";

export interface ICabin {
  name: string;
  tv: boolean;
  bathroom: number;
  room: number;
  wifi: boolean;
  bed: number;
  parking: boolean;
  pet_friendly: boolean;
  heating: boolean;
  air_conditioning: boolean;
  capacity: number;
  pictureURLs: string[];
  description: string;
  price: {
    winter: number;
    spring: number;
    summer: number;
    fall: number;
  };
}

const cabinSchema = new Schema({
  name: { type: String, required: true },
  tv: { type: Boolean, required: true },
  bathroom: { type: Number, required: true },
  room: { type: Number, required: true },
  wifi: { type: Boolean, required: true },
  bed: { type: Number, required: true },
  parking: { type: Boolean, required: true },
  pet_friendly: { type: Boolean, required: true },
  heating: { type: Boolean, required: true },
  air_conditioning: { type: Boolean, required: true },
  capacity: { type: Number, required: true },
  pictureURLs: [{ type: String, required: true }],
  description: { type: String, required: true },
  price: {
    winter: { type: Number, required: true },
    spring: { type: Number, required: true },
    summer: { type: Number, required: true },
    fall: { type: Number, required: true },
  },
});

const Cabin: Model<ICabin> =
  models.Cabin || model<ICabin>("Cabin", cabinSchema);

export default Cabin;
