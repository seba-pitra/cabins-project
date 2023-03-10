import User from '@/models/User';
import { IUser } from '../interfaces/User';

export default class AuthService {
  constructor() {}

  async findUser(email: string) {
    const user = await User.findOne({ email });
    console.log(user);
    return user;
  }

  createUser(user: IUser) {
    const newUser = new User(User);
    return newUser;
  }
}
