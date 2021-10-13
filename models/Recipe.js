const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
  },
  likes: {
    type: Number,
  },
});

const Recipe = model('recipe', recipeSchema);

module.exports = Recipe;
