import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import AuthService from '@/services/AuthService';
import { IUser, IUserResponse } from '../interfaces/User';

import { generateJWT } from '@/helpers/jwt';

type Data =
  | {
      error: boolean;
      message: string;
    }
  | IUserResponse;

export default class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async createUser(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { email, password } = req.body;

    await db.connect();

    try {
      let user: IUser | null = await this.authService.findUser(email);

      if (user) {
        await db.disconnect();
        return res.status(400).json({
          error: true,
          message: 'A user exists with that email',
        });
      }

      user = this.authService.createUser(req.body);

      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt);

      await user.save();
      await db.disconnect();

      const token: string = await generateJWT(user.id, user.fullname);

      return res.status(201).json({
        error: false,
        uid: user.id,
        fullname: user.fullname,
        token,
      });
    } catch (error) {
      console.error(error);
      await db.disconnect();
      return res.status(500).json({
        error: true,
        message: 'Please talk to the administrator ' + error,
      });
    }
  }

  async loginUser(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: 'Please provide a valid email and password',
      });
    }

    try {
      const user = await this.authService.findUser(email);
      if (!user) {
        return res.status(401).json({
          error: true,
          message: 'Email or password are not correct',
        });
      }

      const validatedPassword = bcrypt.compareSync(password, user.password);

      if (!validatedPassword) {
        return res.status(401).json({
          error: true,
          message: 'Incorrect password',
        });
      }

      const token = await generateJWT(user.id, user.fullname);

      res.status(200).json({
        error: false,
        uid: user.id,
        fullname: user.fullname,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: 'Please talk to the administrator',
      });
    }
  }
}
