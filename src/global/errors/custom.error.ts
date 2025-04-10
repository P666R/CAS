import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { ZodErrorDetail } from '@/global/middlewares/requestValidator.middleware';

interface ErrorDetail {
  [key: string]: unknown;
}

export type ErrorDetails = ErrorDetail | ZodErrorDetail | undefined;

export class CustomError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: ErrorDetails,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string = ReasonPhrases.NOT_FOUND, details?: ErrorDetails) {
    super(StatusCodes.NOT_FOUND, message, details);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string = ReasonPhrases.BAD_REQUEST, details?: ErrorDetails) {
    super(StatusCodes.BAD_REQUEST, message, details);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string = ReasonPhrases.UNAUTHORIZED, details?: ErrorDetails) {
    super(StatusCodes.UNAUTHORIZED, message, details);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string = ReasonPhrases.FORBIDDEN, details?: ErrorDetails) {
    super(StatusCodes.FORBIDDEN, message, details);
  }
}

export class ValidationError extends CustomError {
  constructor(message: string = 'Validation Error', details?: ErrorDetails) {
    super(StatusCodes.BAD_REQUEST, message, details);
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string = ReasonPhrases.INTERNAL_SERVER_ERROR, details?: ErrorDetails) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message, details);
  }
}
