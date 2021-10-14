require('dotenv').config();

const User = require('../models/User');

const { joiUserSchema } = require('../models/joiSchemas/joiUser');
const { handleUserErrors } = require('../utils/handleErrors');
const { createToken } = require('../utils/createToken');

// 1 day in seconds
const maxAge = 24 * 60 * 60;

module.exports.validateUser = (req, res, next) => {
  const { body } = req;

  const { error } = joiUserSchema.validate(body);

  if (error) {
    const msg = error.details.map((err) => err.message).join(',');
    console.log(msg);

    throw new Error();
  } else {
    console.log('User object valid');
  }

  next();
};

module.exports.postNewSignUp = async (req, res) => {
  const { body } = req;
  const { email, password } = body;

  console.log(email, password);

  try {
    const newUser = await User.create(body);
    const token = createToken(newUser._id);

    const userToShow = { ...newUser._doc, password: 'hidden' };

    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json(userToShow);
  } catch (err) {
    const errors = handleUserErrors(err);

    res.status(400).json(errors);
  }
};
