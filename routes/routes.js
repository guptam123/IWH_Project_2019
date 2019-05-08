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

router.post('/user_profile_updation/', userProfileController.user_profile_updation);



//get API

router.get('/show_posts', controller.show_posts);

//router.get('/:uid/:aid/deletepost_user', controller.deletepost_user);

router.get('/search/people',controller.search_people);

router.get('/search/company',controller.search_company);

router.get('/search/post',controller.search_post);

router.get('/search/global_search',controller.global_search);


module.exports = router;
