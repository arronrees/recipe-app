const Recipie = require('../models/Recipie');

module.exports.getAllRecipies = async (req, res) => {
  const recipies = await Recipie.find();

  // res.send('Hello');
  res.json(recipies);
};
