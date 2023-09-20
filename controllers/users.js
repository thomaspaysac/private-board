const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.render('sign_up_form');
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
    .escape(),
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

  // TODO
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
  })
]