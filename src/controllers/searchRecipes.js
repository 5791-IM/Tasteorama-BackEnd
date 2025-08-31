import { Recipes } from '../models/recipes.js';
import { Ingredients } from '../models/ingredients.js';

export const searchRecipesController = async (req, res, next) => {
  try {
    const {
      title = '',
      category,
      ingredient,
      page = '1',
      limit = '12',
    } = req.query; // ✅ исправлено с req.guery на req.query

    let pageNum = Number(page);
    let limitNum = Number(limit);

    if (isNaN(pageNum) || pageNum <= 0) pageNum = 1;
    if (isNaN(limitNum) || limitNum <= 0) limitNum = 12;

    const skip = (pageNum - 1) * limitNum;

    const filter = {};

    // 🔎 Поиск по названию рецепта (регистронезависимый)
    if (title.trim()) {
      filter.title = { $regex: title.trim(), $options: 'i' };
    }

    // 🔎 Фильтрация по категории
    if (category) {
      filter.category = category;
    }

    // 🔎 Поиск по ингредиенту
    if (ingredient) {
      const matchedIngredient = await Ingredients.findOne({
        name: { $regex: ingredient, $options: 'i' },
      });

      if (matchedIngredient) {
        filter['ingredients.ingredient'] = matchedIngredient._id;
      } else {
        return res.json({
          status: 200,
          message: 'No recipes found with this ingredient',
          data: {
            recipes: [],
            page: pageNum,
            perPage: limitNum,
            totalItems: 0,
            totalPages: 0,
          },
        });
      }
    }

    // 🥘 Получение рецептов с фильтрацией и пагинацией
    const recipes = await Recipes.find(filter)
      .skip(skip)
      .limit(limitNum)
      .populate('ingredients.ingredient'); // ✅ подтягиваем названия ингредиентов

    // 📊 Подсчёт количества для пагинации
    const totalRecipes = await Recipes.countDocuments(filter);
    const totalPages = Math.ceil(totalRecipes / limitNum);

    res.json({
      status: 200,
      message: 'Recipes found successfully',
      data: {
        recipes,
        page: pageNum,
        perPage: limitNum,
        totalItems: totalRecipes,
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

// import { Recipe } from '../models/recipes';

// export const searchRecipesController = async (req, res, next) => {
//   try {
//     const {
//       title = '',
//       category,
//       ingredient,
//       page = '1',
//       limit = '12',
//     } = req.query;

//     let pageNum = Number(page);
//     let limitNum = Number(limit);

//     if (isNaN(pageNum) || pageNum <= 0) pageNum = 1;
//     if (isNaN(limitNum) || limitNum <= 0) limitNum = 12;

//     const skip = (pageNum - 1) * limitNum;

//     const filter = {};

//     if (title.trim()) {
//       filter.title = { $regex: title.trim(), $options: 'i' };
//     }

//     if (category) {
//       filter.category = category;
//     }

//     if (ingredient) {
//       filter['ingredient.name'] = { $regex: ingredient, $options: 'i' };
//     }

//     const recipes = await Recipe.find(filter).skip(skip).limit(limitNum);

//     const totalRecipes = await Recipe.countDocuments(filter);
//     const totalPages = Math.ceil(totalRecipes / limitNum);

//     res.json({
//       status: 200,
//       message: 'Recipes found successfully',
//       data: {
//         recipes,
//         page: pageNum,
//         perPage: limitNum,
//         totalItems: totalRecipes,
//         totalPages,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };
