import express from 'express';
import { serializeError } from 'serialize-error';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Logger } from '@/global/logging/logger';
import { env } from '@/global/config/env/env.config';
import { CustomError, ErrorDetails } from '@/global/errors/custom.error';

export class ErrorHandler {
  private static instance: ErrorHandler;
  private readonly logger = Logger.getInstance().createChildLogger({
    service: 'ErrorHandler',
  });

  private constructor() {}

  // -- Middleware to catch and process errors --
  public handle(err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) {
    let statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;
    let message: string = ReasonPhrases.INTERNAL_SERVER_ERROR;
    let details: ErrorDetails = undefined;

    // -- Handle custom errors --
    if (err instanceof CustomError) {
      statusCode = err.statusCode;
      message = err.message;
      details = err.details;
    }

    // -- Log the error --
    this.logError(err, req);

    // -- Create error response --
    const response: Record<string, unknown> = {
      success: false,
      error: message,
    };

    if (!env.isProduction) {
      response.stack = err.stack?.split('\n').map((line) => line.trim());
    }
    if (details) {
      response.details = details;
    }

    // -- Send error response --
    res.status(statusCode).json(response);
  }

  private logError(err: Error, req: express.Request) {
    const logData = {
      method: req.method,
      url: req.originalUrl,
      error: env.isProduction ? err.message : serializeError(err),
    };

    if (err instanceof CustomError && err.statusCode < 500) {
      this.logger.warn(logData, 'Client error occurred');
    } else {
      this.logger.error(logData, 'Server error occurred');
    }
  }

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }
}
