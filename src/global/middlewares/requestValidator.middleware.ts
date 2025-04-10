import express from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../errors/custom.error';
import { TypedRequest } from '../interfaces/request.interface';

export interface ZodErrorDetail {
  field: string;
  message: string;
}

const mapZodErrors = (error: ZodError): ZodErrorDetail[] =>
  error.errors.map((e) => ({
    field: e.path.join('.'),
    message: e.message,
  }));

export const validateRequest = <T>(schema: ZodSchema<T>) => {
  return (req: TypedRequest<T>, _res: express.Response, next: express.NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new ValidationError('Request validation failed', { details: mapZodErrors(result.error) });
    }
    req.body = result.data;
    next();
  };
};
