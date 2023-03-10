import { Model, model, models, Schema } from 'mongoose';
import { IUser } from '../interfaces/User';

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User: Model<IUser> = models.User || model<IUser>('User', userSchema);

export default User;
