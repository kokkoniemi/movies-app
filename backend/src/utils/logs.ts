import { createLogger, transports } from 'winston';
import expressWinston from 'express-winston';

/**
 * Logs express requests
 */
export const expressLogger = expressWinston.logger({
  expressFormat: true,
  colorize: false,
  transports: [
    new transports.Console(),
  ],
  meta: false,
  msg: 'HTTP ',
});

export const logger = createLogger({
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  },
  transports: [
    new transports.Console(),
  ],
});
