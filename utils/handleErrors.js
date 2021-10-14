module.exports.handleUserErrors = (err) => {
  console.log(err.code, err.message);

  let errors = {
    email: '',
    username: '',
  };

  if (err.code === 11000) {
    if (err.message.includes('username:')) {
      errors.username = 'Username already taken';
    } else if (err.message.includes('email:')) {
      errors.email = 'Email already registered';
    }
  }

  return errors;
};
