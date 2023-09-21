const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users');

/* GET sign-up form page. */
router.get('/sign-up', users_controller.sign_up_get);
router.post('/sign-up', users_controller.sign_up_post);

router.get('/log-in', users_controller.log_in_get);
router.post('/log-in', users_controller.log_in_post);

router.get('/log-out', users_controller.log_out_get);

router.get('/upgrade', users_controller.upgrade_form_get);
router.post('/upgrade', users_controller.upgrade_form_post);

module.exports = router;
