const express = require('express');
const router = express.Router();

// Require the controllers
const controller = require('../controllers/controller');

router.get('/about', function (req, res) {
    res.send('Welocme to ABC');
  });

router.post('/post_create/',controller.post_create);

router.get('/show_posts', controller.show_posts);

module.exports = router;