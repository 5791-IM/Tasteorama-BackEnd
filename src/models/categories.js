import mongoose from 'mongoose';

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Categories = mongoose.model('categories', categoriesSchema);
