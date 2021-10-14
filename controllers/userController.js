const User = require('../models/User');

const { joiUserSchema } = require('../models/joiSchemas/joiUser');

const { handleUserErrors } = require('../utils/handleErrors');

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

  try {
    const newUser = await User.create(body);

    res.json(newUser);
  } catch (err) {
    const errors = handleUserErrors(err);

    res.status(400).json(errors);
  }
};
