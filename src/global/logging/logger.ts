import pino from 'pino';
import { env } from '@/global/config/env/env.config';

export class Logger {
  private static instance: Logger;
  private readonly logger: pino.Logger;

  private constructor() {
    this.logger = pino({
      level: env.LOG_LEVEL,
      ...(env.isProduction
        ? {
            // -- Production: Raw JSON output to stdout --
            timestamp: pino.stdTimeFunctions.isoTime,
          }
        : {
            // -- Development: Pretty print to console and file --
            transport: {
              targets: [
                {
                  target: 'pino-pretty',
                  options: {
                    colorize: true,
                    levelFirst: true,
                    translateTime: 'yyyy-mm-dd HH:MM:ss',
                    ignore: 'pid,hostname',
                  },
                  level: env.LOG_LEVEL,
                },
                {
                  target: 'pino-pretty',
                  options: {
                    destination: 'logs/app.log',
                    colorize: false,
                    levelFirst: true,
                    translateTime: 'yyyy-mm-dd HH:MM:ss',
                    ignore: 'pid,hostname',
                    mkdir: true,
                  },
                  level: env.LOG_LEVEL,
                },
              ],
            },
          }),
    });
    this.logger.info(`Logger initialized in ${env.NODE_ENV} mode with level ${env.LOG_LEVEL}`);
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public getLogger(): pino.Logger {
    return this.logger;
  }

  public createChildLogger(bindings: pino.Bindings): pino.Logger {
    return this.logger.child(bindings);
  }
}
