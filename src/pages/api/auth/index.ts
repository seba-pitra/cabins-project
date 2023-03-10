import type { NextApiRequest, NextApiResponse } from 'next';

import methods from 'micro-method-router';
import AuthController from '@/controllers/AuthController';

const auth = new AuthController();

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  return auth.loginUser(req, res);
};

export default methods({ get });
