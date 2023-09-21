const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const Message = require('../models/message');

exports.index_get = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({}).populate('author').exec();
  res.render('index', { 
    title: 'Private Board',
    messages });
})