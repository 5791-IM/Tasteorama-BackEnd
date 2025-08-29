import mongoose from 'mongoose';

const ingredientsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Ingredients = mongoose.model('ingredients', ingredientsSchema);
