import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { getCurrent } from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const usersRouter = Router();

usersRouter.get('/current', authenticate, ctrlWrapper(getCurrent));

export default usersRouter;
