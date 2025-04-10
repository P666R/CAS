import mongoose from 'mongoose';
import { Logger } from '@/global/logging/logger';
import { InternalServerError } from '@/global/errors/custom.error';

const logger = Logger.getInstance().createChildLogger({ service: 'mongodb' });

export const createMongoConnector = (mongoUri: string) => {
  const connect = async (options = {}) => {
    try {
      await mongoose.connect(mongoUri, { ...options });
      logger.info('Mongoose connected to MongoDB');
    } catch (error) {
      logger.error({ error }, 'Failed to connect to MongoDB');
      throw new InternalServerError('Failed to connect to MongoDB', { error });
    }
  };

  mongoose.connection.on('connected', () => {
    logger.info('Mongoose connection established');
  });
  mongoose.connection.on('disconnected', () => {
    logger.warn('Mongoose disconnected from MongoDB');
  });

  const disconnect = async () => {
    try {
      await mongoose.connection.close();
      logger.info('Mongoose connection closed');
    } catch (error) {
      logger.error({ error }, 'Failed to disconnect from MongoDB');
      throw new InternalServerError('Failed to disconnect from MongoDB', { error });
    }
  };

  return { connect, disconnect };
};
