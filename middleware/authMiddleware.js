require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.updateLoginStatus = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWTSECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.checkLoggedIn = (req, res, next) => {
  if (res.locals.user) {
    res.redirect('/recipes');
  } else {
    next();
  }
};
