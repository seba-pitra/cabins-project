import { Document } from 'mongoose';

export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
}

export interface IUserResponse {
  error: boolean;
  uid: string;
  fullname: string;
  token: string;
}
