import { CurrentUser } from '@/features/user/interfaces/user.interface';

declare module 'express' {
  interface Request {
    currentUser?: CurrentUser;
  }
}
