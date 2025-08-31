import createHttpError from 'http-errors';
import { Recipes } from '../models/recipes.js';

export const getRecipeByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await Recipes.findById(id).populate(
      'ingredients.ingredient',
      'name',
    );
    if (!recipe) {
      throw createHttpError(404, 'Recipe not found');
    }
    res.status(200).json({
      status: 200,
      message: 'Recipe found successfully',
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};
