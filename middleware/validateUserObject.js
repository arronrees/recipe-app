const { joiUserSchema } = require('../models/joiSchemas/joiUser');

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
