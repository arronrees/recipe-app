require('dotenv').config();

const User = require('../models/User');

const { handleUserErrors } = require('../utils/handleErrors');
const { createToken } = require('../utils/createToken');

// 1 day in seconds
const maxAge = 24 * 60 * 60;

module.exports.getSignUp = (req, res) => {
  res.render('sign-up');
};

module.exports.getLogIn = (req, res) => {
  res.render('log-in');
};

module.exports.postNewSignUp = async (req, res) => {
  const { body } = req;

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

module.exports.postSignOut = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });

  res.json({ success: true });
};

module.exports.putUpdateUserDetails = async (req, res) => {
  // dont send password in body as not needed in handler
  const { firstName, lastName, username, email } = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await User.updateOne(
      { _id: id },
      { firstName, lastName, username, email }
    );

    res.status(201).json(updatedUser);
  } catch (err) {
    const errors = handleUserErrors(err);
    res.status(400).json(errors);
  }
};

module.exports.putUpdateUserPassword = async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;

  try {
    await User.updatePasswordCheck(id, password);
    const newPassword = await User.updatePasswordHash(password);
    const updatedUser = await User.updateOne(
      { _id: id },
      { password: newPassword }
    );

    res.status(201).json(updatedUser);
  } catch (err) {
    const errors = handleUserErrors(err);
    res.status(400).json(errors);
  }
};

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.deleteOne({ _id: id });

  res.status(200).json(user);
};

// to be removed in production
module.exports.getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.json(users);
};
