import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { searchRecipesController } from '../controllers/searchRecipes.js';
import { getRecipeByIdController } from '../controllers/recipesById.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { addRecipeSchema } from '../validation/recipes.js';
import { addRecipeController } from '../controllers/recipes.js';

const recipesRouter = Router();

recipesRouter.get('/', ctrlWrapper(searchRecipesController));
recipesRouter.get('/:id', ctrlWrapper(getRecipeByIdController));
recipesRouter.post(
  '/',
  authenticate,
  validateBody(addRecipeSchema),
  ctrlWrapper(addRecipeController),
);

export default recipesRouter;
