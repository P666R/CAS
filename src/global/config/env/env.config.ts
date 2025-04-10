import { cleanEnv, num, port, str } from 'envalid';

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
    desc: 'MongoDB database URL',
  }),
  LOG_LEVEL: str({
    choices: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
    default: 'info',
    desc: 'Log level',
  }),
  JWT_SECRET: str({ desc: 'JWT secret key' }),
  JWT_EXPIRES_IN: num({ default: 86400, desc: 'JWT expires in' }),
});
