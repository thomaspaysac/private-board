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