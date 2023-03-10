import Cabin from "@/models/Cabin";
import { connect } from "@/db/database";

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connect();
  const cabins = await Cabin.find();
  res.json(cabins);
};
