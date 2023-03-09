import Cabin from "@/models/Cabin";
import { connectMongoDb } from "@/db/database";

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMongoDb();
  // const cabins = await Cabin.find();
  res.json("golaa");
};
