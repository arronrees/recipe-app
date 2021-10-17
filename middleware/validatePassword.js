const { joiPasswordValidate } = require('../models/joiSchemas/joiUser');

module.exports.validatePassword = (req, res, next) => {
  const { password } = req.body;

  const { error } = joiPasswordValidate.validate(password);

  if (error) {
    const msg = error.details.map((err) => err.message).join(',');
    console.log(msg);

    throw new Error(msg);
  } else {
    console.log('Password valid');
  }

  next();
};
