import { cleanEnv, port, str } from 'envalid';

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'production', 'test'],
    default: 'development',
    desc: 'Environment',
  }),
  PORT: port({
    default: 5000,
    desc: 'Port',
  }),
  DATABASE_URL: str({
    default: 'mongodb://localhost:27017',
    desc: 'MongoDB database URL',
  }),
  LOG_LEVEL: str({
    choices: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
    default: 'info',
    desc: 'Log level',
  }),
});
