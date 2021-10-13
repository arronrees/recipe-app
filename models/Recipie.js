const { Schema, model } = require('mongoose');

const recipieSchema = new Schema({
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

const Recipie = model('recipie', recipieSchema);

module.exports = Recipie;
