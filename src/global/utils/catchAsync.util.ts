import express from 'express';
import { TypedRequest } from '@/global/interfaces/request.interface';

type Handler<T> = (req: TypedRequest<T>, res: express.Response, next: express.NextFunction) => Promise<void>;

export const catchAsync = <T>(
  fn: Handler<T>,
): ((req: TypedRequest<T>, res: express.Response, next: express.NextFunction) => void) => {
  return (req: TypedRequest<T>, res: express.Response, next: express.NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
