const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users');

/* GET sign-up form page. */
router.get('/sign-up', users_controller.sign_up_get);

router.post('/sign-up', users_controller.sign_up_post)

module.exports = router;
