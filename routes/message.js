const express = require('express');
const router = express.Router();

const messages_controller = require('../controllers/messages');

router.get('/new', messages_controller.new_message_get);
router.post('/new', messages_controller.new_message_post);

module.exports = router;