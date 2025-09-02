import { Recipes } from '../models/recipes.js';

export const addRecipeController = async (req, res) => {
  const recipe = await Recipes.create({
    ...req.body,
    owner: req.user._id,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a recipe!',
    data: recipe,
  });
};
