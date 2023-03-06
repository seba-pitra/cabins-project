// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { ICabin } from "@/interfaces/Cabin";

import Cabin from "@/models/Cabin";

//   name: { type: String, required: true },
//   tv: { type: Boolean, required: true },
//   bathroom: { type: Number, required: true },
//   room: { type: Number, required: true },
//   wifi: { type: Boolean, required: true },
//   bed: { type: Number, required: true },
//   parking: { type: Boolean, required: true },
//   pet_friendly: { type: Boolean, required: true },
//   heating: { type: Boolean, required: true },
//   air_conditioning: { type: Boolean, required: true },
//   capacity: { type: Number, required: true },
//   pictureURLs: [{ type: String, required: true }],
//   description: { type: String, required: true },
//   price: {
//     winter: { type: Number, required: true },
//     spring: { type: Number, required: true },
//     summer: { type: Number, required: true },
//     fall: { type: Number, required: true },
//   },

const newCabin: ICabin = {
  name: "Cozy Cabin",
  tv: true,
  bathroom: 1,
  room: 1,
  wifi: true,
  bed: 1,
  parking: true,
  pet_friendly: false,
  heating: true,
  air_conditioning: false,
  capacity: 2,
  pictureURLs: [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
  ],
  description: "A cool cabin in the woods",
  price: {
    winter: 100,
    spring: 120,
    summer: 150,
    fall: 120,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICabin>
) {
  Cabin.create(newCabin);

  res.status(200).json(newCabin);
}
