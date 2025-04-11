import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import { Logger } from '@/global/logging/logger';
import { env } from '@/global/config/env/env.config';
import { appRoutes } from './global/routes/app.route';
import { ErrorHandler } from '@/global/errors/handler.error';

export class Server {
  private readonly app: express.Application;
  private readonly logger = Logger.getInstance().createChildLogger({
    service: 'Server',
  });
  private readonly errorHandler = ErrorHandler.getInstance();

  constructor() {
    this.app = express();
  }

  public start() {
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupGlobalErrorMiddleware();
    this.listenServer();
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

  private listenServer() {
    this.app.listen(env.PORT, () => {
      this.logger.info(`Server running on port ${env.PORT}`);
    });
  }
}
