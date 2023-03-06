import Cabin from "../../../models/cabin";
import { connect } from "../../../utils/mongoose";

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connect();
  const cabins = await Cabin.find();
  res.json(cabins);
};
