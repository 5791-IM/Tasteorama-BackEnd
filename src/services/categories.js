import { Categories } from '../models/categories.js';

export const getCategories = async () => {
  const categories = await Categories.find();
  return categories;
};
