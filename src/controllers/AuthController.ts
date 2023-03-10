import { db } from '@/db';
import { generateJWT } from '@/helpers/jwt';
import AuthService from '@/services/AuthService';
import bcrypt from 'bcryptjs';

import type { NextApiRequest, NextApiResponse } from 'next';

export default class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async createUser(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;

    await db.connect();

    try {
      let user = await this.authService.findUser(email);

      if (user) {
        await db.disconnect();
        return res.status(400).json({
          ok: false,
          message: 'A user exists with that email',
        });
      }

      user = this.authService.createUser(req.body);

      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt);

      await user.save();
      await db.disconnect();

      const token = await generateJWT(user.id, user.fullname);

      return res.status(201).json({
        ok: true,
        uid: user.id,
        name: user.fullname,
        token,
      });
    } catch (error) {
      await db.disconnect();
      return res.status(500).json({
        ok: false,
        msg: 'Please talk to the administrator ' + error,
      });
    }
  }

  async loginUser(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        msg: 'Please provide a valid email and password',
      });
    }

    try {
      const user = await this.authService.findUser(email);
      if (!user) {
        return res.status(401).json({
          ok: false,
          msg: 'Email or password are not correct',
        });
      }

      const validatedPassword = bcrypt.compareSync(password, user.password);

      if (!validatedPassword) {
        return res.status(401).json({
          ok: false,
          msg: 'Incorrect password',
        });
      }

      const token = await generateJWT(user.id, user.fullname);

      res.status(200).json({
        ok: true,
        uid: user.id,
        fullname: user.fullname,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        msg: 'Please talk to the administrator',
      });
    }
  }
}
