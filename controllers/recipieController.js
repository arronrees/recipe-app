const Recipie = require('../models/Recipie');

module.exports.getAllRecipies = async (req, res) => {
  const recipies = await Recipie.find({});

  res.json(recipies);
};

module.exports.getSingleRecipie = async (req, res) => {
  const { id } = req.params;

  const recipie = await Recipie.findById(id);

  res.json(recipie);
};

module.exports.getCategoryRecipies = async (req, res) => {
  const { id } = req.params;
  const lowerId = id.toLowerCase();

  const recipies = await Recipie.find({ categories: lowerId });

  res.json(recipies);
};
