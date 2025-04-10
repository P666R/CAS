import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { Logger } from '@/global/logging/logger';
import { env } from '@/global/config/env/env.config';
import { ErrorHandler } from '@/global/errors/handler.error';
import { InternalServerError } from './global/errors/custom.error';
import { appRoutes } from './global/routes/app.route';

export class Server {
  private readonly app: express.Application;
  private readonly logger = Logger.getInstance().createChildLogger({
    service: 'Server',
  });
  private readonly errorHandler = ErrorHandler.getInstance();

  constructor() {
    this.app = express();
  }

  public async start() {
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupGlobalErrorMiddleware();
    await this.listenServer();
  }

  private async connectToDatabase() {
    try {
      await mongoose.connect(env.DATABASE_URL);
      this.logger.info('Mongoose connected to MongoDB');
    } catch (error: unknown) {
      this.logger.error({ error }, 'Failed to connect to MongoDB');
      throw new InternalServerError('Failed to connect to MongoDB', { error });
    }
  }

  private setupMiddlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private setupRoutes() {
    appRoutes(this.app);
  }

  private setupGlobalErrorMiddleware() {
    // -- Global error handler --
    this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      this.errorHandler.handle(err, req, res, next);
    });
  }

  private async listenServer() {
    await this.connectToDatabase();
    this.app.listen(env.PORT, () => {
      this.logger.info(`Server running on port ${env.PORT}`);
    });
  }
}
