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

// controllers/recipes/getOwnRecipesController.js

export const getOwnRecipesController = async (req, res) => {
  const { _id: owner } = req.user; // айди текущего юзера
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  const [recipes, totalItems] = await Promise.all([
    Recipes.find({ owner }).skip(skip).limit(Number(limit)),
    Recipes.countDocuments({ owner }),
  ]);

  res.json({
    status: 200,
    message: 'Own recipes fetched successfully',
    data: {
      recipes,
      page: Number(page),
      perPage: Number(limit),
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  });
};

// export const getOwnRecipesController = async (req, res) => {
//   const { _id: owner } = req.user;

//   const recipes = await Recipes.find({ owner });

//   res.status(200).json({
//     status: 200,
//     message: 'Successfully fetched your recipes',
//     data: recipes,
//   });
// };
