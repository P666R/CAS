import { Types } from 'mongoose';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface CurrentUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}
