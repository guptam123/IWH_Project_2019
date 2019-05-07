const express = require('express');
const router = express.Router();

// Require the controllers
const controller = require('../controllers/controller');

router.get('/about', function (req, res) {
    res.send('Welocme to ABC');
  });

//post API

router.post('/post_create/',controller.post_create);
router.post('/:id/add_comment', controller.add_comment);

//get API

router.get('/show_posts', controller.show_posts);
router.get('/:uid/:aid/deletepost_user', controller.deletepost_user);


module.exports = router;