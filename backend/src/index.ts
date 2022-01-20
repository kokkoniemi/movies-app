import './utils/env';
import 'reflect-metadata'; // TypeORM needs reflect-metadata shim
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';

import { expressLogger, logger } from './utils/logs';
import errorHandlerMiddleware from './middlewares/error';
import movieRouter from './routes/movies';

/**
 * Initialization function for the application
 */
const initializeExpress = () => {
  const app = express();
  const port = process.env.MOVIES_BACKEND_PORT || 3000;
  const router = express.Router();

  const corsOptions = {
    origin: [process.env.MOVIES_FRONTEND_ORIGIN],
    optionsSuccessStatus: 200, // some legacy browsers choke on 204
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(expressLogger);

  router.use('/movies', movieRouter);
  // Prefix api routes with version number to support possible breaking changes in the future
  app.use('/v1', router);
  app.use(errorHandlerMiddleware);

  app.listen(port, async () => {
    logger.info(`Server is listening on port ${port}`);
  });
};

// Initialize db connection before Express. Settings for the connection reside in ormconfig.json
createConnection({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  password: process.env.DB_PASS,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  entities: ['dist/models/*.js'],
  logging: true,
})
  .then(initializeExpress)
  .catch((e: Error) => {
    logger.error(e);
  });
