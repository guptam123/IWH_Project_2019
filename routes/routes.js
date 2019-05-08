const express = require('express');
const router = express.Router();

// Require the controllers
const controller = require('../controllers/controller');
const userProfileController= require('../controllers/userProfileController');

router.get('/about', function (req, res) {
    res.send('Welocme to ABC');
  });

//post API

router.post('/post_create/',controller.post_create);
//router.post('/:id/add_comment', controller.add_comment);

//get API

router.get('/show_posts', controller.show_posts);
//router.get('/:uid/:aid/deletepost_user', controller.deletepost_user);


router.post('/:uid/update_add_skill/', userProfileController.update_add_skill);
router.post('/:uid/update_delete_skill/', userProfileController.update_delete_skill);
router.post('/:uid/add_qualification/', userProfileController.add_qualification);
router.post('/:uid/working_hour_start/', userProfileController.update_working_hour_start);
router.post('/:uid/working_hour_end/', userProfileController.update_working_hour_end);
module.exports = router;
