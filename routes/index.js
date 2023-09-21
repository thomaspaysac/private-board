const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const messages = Message.find().populate('author').exec();
  res.render('index', { 
    title: 'Private Board',
    messages });
});

module.exports = router;
