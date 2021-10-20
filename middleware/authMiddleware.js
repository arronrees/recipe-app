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

module.exports.checkLoggedInRedirect = (req, res, next) => {
  if (req.path === '/log-in' || req.path === '/sign-up') {
    if (res.locals.user) {
      res.redirect('/recipes');
    } else {
      next();
    }
  }

  if (req.path === '/profile') {
    if (res.locals.user) {
      next();
    } else {
      res.redirect('/log-in');
    }
  }

  if (req.path === '/recipes/new') {
    if (res.locals.user) {
      next();
    } else {
      res.redirect('/log-in');
    }
  }
};
