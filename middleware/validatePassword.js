const { joiPasswordValidate } = require('../models/joiSchemas/joiUser');
const { handleJoiUserErrors } = require('../utils/handleErrors');

module.exports.validatePassword = (req, res, next) => {
  const { password } = req.body;

  const { error } = joiPasswordValidate.validate(password);

  if (error) {
    const errors = handleJoiUserErrors(error);
    console.log(errors);

    res.status(400).json(errors);
  } else {
    console.log('User password valid');
    next();
  }
};
