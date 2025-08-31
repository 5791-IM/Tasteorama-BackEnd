import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getIngredientsController } from '../controllers/ingredients.js';

const ingredientsRouter = Router();

ingredientsRouter.get('/', ctrlWrapper(getIngredientsController));

export default ingredientsRouter;
