import Joi from 'joi';

export const addRecipeSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  category: Joi.string().required(),
  area: Joi.string().required(),
  instructions: Joi.string().min(10).required(),
  description: Joi.string().min(10).required(),
  thumb: Joi.string().uri().required(),
  time: Joi.number().min(1).max(1000).required(),
  ingredients: Joi.array()
    .items(
      Joi.object({
        ingredient: Joi.string().hex().length(24).required(), // ObjectId ингредиента
        measure: Joi.string().min(1).required(),
      }),
    )
    .min(1)
    .required(),
});
