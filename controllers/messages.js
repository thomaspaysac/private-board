const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const Message = require('../models/message');


// Homepage, messages list
exports.index_get = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({})
    .sort({ timestamp: -1 })
    .populate('author')
    .exec();
  res.render('index', { 
    messages });
});

// New message page
exports.new_message_get = asyncHandler(async (req, res, next) => {
  res.render('new_message_form', {
    title: 'New message'
  })
})

exports.new_message_post = [
  body('message_title', 'Invalid title')
    .trim()
    .isLength({ min: 2, max: 50 })
    .escape()
    .unescape("&#39;", "'"),
  body('message_text', 'Invalid message')
    .trim()
    .isLength({min: 2, max: 100})
    .escape()
    .unescape("&#39;", "'"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const message = new Message({
      title: req.body.message_title,
      text: req.body.message_text,
      author: req.user,
      timestamp: Date.now(),
    });

    if (!errors.isEmpty()) {
      res.render(('new_message_form', {
        title: 'New message',
        message,
        errors: errors.array(),
      }));
      return;
    } else {
      await message.save();
      res.redirect('/');
    }
  })
]

exports.message_delete_post = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.body.messageid).exec();
  if (message === null) {
    res.redirect('/');
  } else {
    await Message.findByIdAndRemove(req.body.messageid)
    res.redirect('/');
  }
})