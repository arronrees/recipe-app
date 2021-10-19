module.exports.getProfile = (req, res) => {
  const getUser = res.locals.user;
  const user = { ...getUser._doc, password: 'hidden' };

  res.render('profile/profile', { user });
};
