import mongoose from 'mongoose';
import { env } from '../env/env.config';
import { Logger } from '@/global/logging/logger';
import { InternalServerError } from '@/global/errors/custom.error';

export class ConnectDB {
  private readonly logger = Logger.getInstance().createChildLogger({
    service: 'ConnectDB',
  });

  public async connect() {
    try {
      await mongoose.connect(env.DATABASE_URL);
      this.logger.info('Mongoose connected to MongoDB');
    } catch (error) {
      this.logger.error({ error }, 'Failed to connect to MongoDB');
      throw new InternalServerError('Failed to connect to MongoDB', { error });
    }
  }
}
