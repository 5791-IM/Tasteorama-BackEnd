import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { searchRecipesController } from '../controllers/searchRecipes.js';
import { getRecipeByIdController } from '../controllers/recipesById.js';

const recipesRouter = Router();

recipesRouter.get('/', ctrlWrapper(searchRecipesController));
recipesRouter.get('/:id', ctrlWrapper(getRecipeByIdController));

export default recipesRouter;
