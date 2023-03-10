import type { NextApiRequest, NextApiResponse } from 'next';

import methods from 'micro-method-router';
import AuthController from '@/controllers/AuthController';

const auth = new AuthController();

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  return auth.createUser(req, res);
};

export default methods({ post });
