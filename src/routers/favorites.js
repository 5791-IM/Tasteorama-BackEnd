import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addToFavoritesController,
  getFavoritesController,
  removeFromFavoritesController,
} from '../controllers/favorites.js';

const favoritesRouter = Router();

favoritesRouter.post(
  '/:id',
  authenticate,
  ctrlWrapper(addToFavoritesController),
);

favoritesRouter.delete(
  '/:id',
  authenticate,
  ctrlWrapper(removeFromFavoritesController),
);

favoritesRouter.get('/', authenticate, ctrlWrapper(getFavoritesController));

export default favoritesRouter;
