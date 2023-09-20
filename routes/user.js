const express = require('express');
const router = express.Router();

/* GET sign-up form page. */
router.get('/sign-up', function(req, res, next) {
  res.render('sign_up_form');
});

router.post('/sign-up', function (req, res, next) {
  res.send('Sign up POST');
})

module.exports = router;
