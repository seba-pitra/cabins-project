import { airtableBase } from "@/libs/airtable";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getCabins(res);

    default:
      return res.status(400).json({ message: "Endpoint no existe" });
  }
}

const getCabins = async (res: NextApiResponse) => {
  const response = await airtableBase("Cabins").select().all();
  const data = response.map((record) => {
    return {
      id: record.id,
      ...record.fields,
    };
  });
  res.status(200).json(data);
};
