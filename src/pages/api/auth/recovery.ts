import type { NextApiRequest, NextApiResponse } from 'next';

import methods from 'micro-method-router';
import AuthController from '@/controllers/AuthController';
import AuthService from '@/services/AuthService';

const authService = new AuthService();
const authController = new AuthController(authService);

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  return authController.recoveryPassword(req, res);
};

export default methods({ post });
