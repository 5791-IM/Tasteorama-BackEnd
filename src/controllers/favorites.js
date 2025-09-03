import { Recipes } from '../models/recipes.js';
import { User } from '../models/user.js';

// Добавить рецепт в избранное
export const addToFavoritesController = async (req, res, next) => {
  try {
    const userId = req.user._id; // из authenticate
    const recipeId = req.params.id;

    // Проверим, что рецепт существует
    const recipe = await Recipes.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const user = await User.findById(userId);

    if (user.savedRecipes.includes(recipeId)) {
      return res.status(400).json({ message: 'Recipe already in favorites' });
    }

    user.savedRecipes.push(recipeId);
    await user.save();

    res.status(200).json({
      message: 'Added to favorites',
      favorites: user.savedRecipes,
    });
  } catch (error) {
    next(error);
  }
};

// Удалить рецепт из избранного
export const removeFromFavoritesController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const recipeId = req.params.id;

    const user = await User.findById(userId);

    user.savedRecipes = user.savedRecipes.filter(
      (favId) => favId.toString() !== recipeId,
    );

    await user.save();

    res.status(200).json({
      message: 'Removed from favorites',
      favorites: user.savedRecipes,
    });
  } catch (error) {
    next(error);
  }
};

// Получить список избранных рецептов
export const getFavoritesController = async (req, res, next) => {
  try {
    const owner = req.user._id;

    const user = await User.findById(owner).populate('savedRecipes');

    res.status(200).json({ favorites: user.savedRecipes });
  } catch (error) {
    next(error);
  }
};
