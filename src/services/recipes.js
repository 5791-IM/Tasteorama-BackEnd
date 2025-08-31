import { Recipes } from '../models/recipes.js';

export const getSearchRecipes = async () => {
  const recipes = await Recipes.find();
  return recipes;
};

export const getRecipeById = async (id) => {
  const recipe = await Recipes.findById(id);
  return recipe;
};
