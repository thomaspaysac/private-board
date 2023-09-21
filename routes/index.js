const express = require('express');
const router = express.Router();

const messages_controller = require('../controllers/messages');

/* GET home page. */
router.get('/', messages_controller.index_get);

module.exports = router;
