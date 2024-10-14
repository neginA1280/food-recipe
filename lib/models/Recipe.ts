import mongoose, { Schema, model, models } from 'mongoose';

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Recipe must have a name'],
    },
    ingredients: {
      type: [String],
      required: [true, 'Recipe must have ingredients'],
    },
    instructions: {
      type: [String],
      required: [true, 'Recipe must have instructions'],
    },
    prepTimeMinutes: {
      type: Number,
    },
    cookTimeMinutes: {
      type: Number,
    },
    servings: {
      type: Number,
    },
    difficulty: {
      type: String,
    },
    cuisine: {
      type: String,
    },
    caloriesPerServing: {
      type: Number,
    },
    tags: {
      type: [String],
    },
    userId: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    rating: {
      type: Number,
    },
    reviewCount: {
      type: Number,
    },
    mealType: {
      type: [String],
    },
  },
  { timestamps: true }
);

// Prevent model overwrite if it's already compiled
const Recipe = models.Recipe || model('Recipe', recipeSchema);

export default Recipe;
