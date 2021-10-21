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
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  image: {
    type: String,
  },
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;
