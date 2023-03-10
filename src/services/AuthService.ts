import User from '@/models/User';
import { IUser } from '../interfaces/User';

export default class AuthService {
  async findUser(email: string): Promise<IUser | null> {
    const user: IUser | null = await User.findOne({ email });
    return user;
  }

  createUser(user: IUser): IUser {
    const newUser: IUser = new User(user);
    return newUser;
  }
}
