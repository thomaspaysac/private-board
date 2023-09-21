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
    title: 'Private Board',
    messages });
});

// New message page
exports.new_message_get = asyncHandler(async (req, res, next) => {
  res.render('new_message_form', {
    title: 'New message'
  })
})

exports.new_message_post = [
  body('message', 'Invalid message')
    .trim()
    .isLength({min: 2, max: 100})
    .escape(),

  asyncHandler(async (req, res, next) => {
    // A FAIRE
  })
]