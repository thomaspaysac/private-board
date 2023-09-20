const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.render('sign_up_form', { title: 'Sign up' });
})

exports.sign_up_post = [
  body('first_name', 'First name must contain at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('last_name', 'Last name must contain at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('username', 'Username must contain at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .custom(async (value) => {
      const username = await User.find({ username: value }).exec();
      if (username) {
        throw new Error('This username is already in use')
      }
    }),
  body('password', 'Password must contain at least 5 characters')
    .trim()
    .isLength({ min: 5 }),
  body('password_confirm')
    .custom((value, {req}) => {
      if (value !== req.body.password) {
        throw new Error('Password confirm doesn\'t match')
      } else {
        return true;
      };
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
      membership: 'Basic',
    });

    if (!errors.isEmpty()) {
      res.render('sign_up_form', {
        title: 'Sign up',
        user,
        errors: errors.array(),
      });
      return;
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        try {
          user.password = hashedPassword;
          await user.save();
          res.redirect("/");
        } catch(err) {
          return next(err);
        };
      });
    }
  })
];

exports.log_in_get = asyncHandler((req, res, next) => {
  res.render('log_in_form', { title: 'Log in' });
});

exports.log_in_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/user/log-in",
  failureMessage: true
});

exports.log_out_get = asyncHandler((req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
})