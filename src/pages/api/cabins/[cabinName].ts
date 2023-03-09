import { airtableBase } from '@/libs/airtable';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return getCabinByName(res, 'recX3zWKRO97KZkUV');

    default:
      return res.status(400).json({ message: 'Endpoint no existe' });
  }
}

const getCabinByName = async (res: NextApiResponse, name: string) => {
  const response = await airtableBase('Cabins').find(name);
  const data = {
    id: response.id,
    ...response.fields,
  };
  res.status(200).json(data);
};
