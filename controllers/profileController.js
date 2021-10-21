const Recipe = require('../models/Recipe');
const User = require('../models/User');

module.exports.getProfile = async (req, res) => {
  const getUser = res.locals.user;
  const user = { ...getUser._doc, password: 'hidden' };

  res.render('profile/profile', { user });
};

module.exports.getProfileLikedRecipes = async (req, res) => {
  const id = res.locals.user._id;

  const user = await User.findById(id).populate('likedRecipes');
  const recipes = await user.likedRecipes;

  res.render('profile/liked-recipes', { recipes });
};

module.exports.getMyRecipes = async (req, res) => {
  const id = res.locals.user._id;

  const recipes = await Recipe.find({ user: id });

  res.render('profile/my-recipes', { recipes });
};
