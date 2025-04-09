import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import { Logger } from '@/global/logging/logger';
import { env } from '@/global/config/env/env.config';

export class Server {
  private readonly app: express.Application;
  private readonly logger = Logger.getInstance().getLogger();

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

  private setupRoutes() {}

  private setupGlobalErrorMiddleware() {}

  private listenServer() {
    this.app.listen(env.PORT, () => {
      this.logger.info(`Server running on port ${env.PORT}`);
    });
  }
}
