require('dotenv').config();

const User = require('../models/User');

const { joiUserSchema } = require('../models/joiSchemas/joiUser');
const { handleUserErrors } = require('../utils/handleErrors');
const { createToken } = require('../utils/createToken');

// 1 day in seconds
const maxAge = 24 * 60 * 60;

module.exports.validateUserObject = (req, res, next) => {
  const { body } = req;

  const { error } = joiUserSchema.validate(body);

  if (error) {
    const msg = error.details.map((err) => err.message).join(',');
    console.log(msg);

    throw new Error(msg);
  } else {
    console.log('User object valid');
  }

  next();
};

module.exports.postNewSignUp = async (req, res) => {
  const { body } = req;
  const { email, password } = body;

  try {
    const newUser = await User.create(body);
    const token = createToken(newUser._id);

    const userToShow = { ...newUser._doc, password: 'hidden' };

    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json(userToShow);
  } catch (err) {
    const errors = handleUserErrors(err);

    res.status(400).json(errors);
  }
};

module.exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    const userToShow = { ...user._doc, password: 'hidden' };

    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json(userToShow);
  } catch (err) {
    const errors = handleUserErrors(err);
    res.status(400).json(errors);
  }
};

module.exports.putUpdateUserDetails = async (req, res) => {
  // dont send password in body as not needed in handler
  const { firstName, lastName, username, email } = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await User.updateOne(
      { id: id },
      { firstName, lastName, username, email }
    );

    res.status(201).json(updatedUser);
  } catch (err) {
    const errors = handleUserErrors(err);
    res.status(400).json(errors);
  }
};

// to be removed in production
module.exports.getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.json(users);
};
