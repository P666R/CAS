import { Request } from 'express';
import { CurrentUser } from '@/features/user/interfaces/user.interface';

export interface TypedRequest<T> extends Request {
  body: T;
  currentUser?: CurrentUser;
}
