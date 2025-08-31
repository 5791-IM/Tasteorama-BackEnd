// src/server.js
import { getEnvVar } from './utils/getEnvVar.js';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import cookieParser from 'cookie-parser';
import authRouter from './routers/auth.js';
import usersRouter from './routers/usersRouter.js';
import categoriesRouter from './routers/categories.js';
import ingredientsRouter from './routers/ingredients.js';
import recipesRouter from './routers/recipes.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd,api+json'],
      limit: '100kb',
    }),
  );
  // app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

  app.use('/api/auth', authRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/categories', categoriesRouter);
  app.use('/api/ingredients', ingredientsRouter);
  app.use('/api/recipes/search', recipesRouter);
  app.use('/api/recipes', recipesRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
