const express = require('express');
const router = express.Router();

// Require the controllers
const controller = require('../controllers/controller');
const userProfileController= require('../controllers/userProfileController');
const companyProfileController= require('../controllers/companyProfileController');
router.get('/about', function (req, res) {
    res.send('Welocme to ABC');
  });

/////////////////////////////////////////////////////////////////////////////////////////////
//API endpoints related to posts
router.post('/:id/:type/post_create/',controller.post_create);//id is _id of the user/comp who creates the post
router.get('/:aid/:name/upvotepost', controller.upvotepost);
router.post('/:id/add_comment', controller.add_comment);
//////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
//API endpoints related to 'follow'
router.post('/:id1/:id2/:type1/:type2/follow/',controller.follow);
//id1-->follower._id , id2-->followed._id , type1--> 1(2) if follower is a user(company)
//                                          type2--> 1(2) if user(company) is being followed
////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
//search API endpoints
router.post('/search/people',controller.search_people);
router.post('/search/company',controller.search_company);
router.post('/search/post',controller.search_post);
router.post('/search/global_search',controller.global_search);
/////////////////////////////////////////////////////////////////////////////////////////////


//router.post('/:id/add_comment', controller.add_comment);

router.get('/show_posts', controller.show_posts);
//router.get('/:uid/:aid/deletepost_user', controller.deletepost_user);

//////////////////////////////////////////////////////////////////////////////////////////////////
/////API endpoints for user profile as seen by user
router.post('/:uid/update_add_skill/', userProfileController.update_add_skill);
router.post('/:uid/update_delete_skill/', userProfileController.update_delete_skill);
router.post('/:uid/add_qualification/', userProfileController.add_qualification);
router.post('/:uid/delete_qualification/', userProfileController.delete_qualification);
router.post('/:uid/update_age/', userProfileController.update_age);
router.post('/:uid/update_city/', userProfileController.update_city);
router.post('/:uid/update_country/', userProfileController.update_country);
router.post('/:uid/update_name/', userProfileController.update_name);
router.post('/:uid/update_email/', userProfileController.update_email);
router.post('/:uid/working_hour_start/', userProfileController.update_working_hour_start);
router.post('/:uid/working_hour_end/', userProfileController.update_working_hour_end);
////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////
/////API endpoints for company profile as seen by user
router.post('/:cid/update_add_domain/', companyProfileController.update_add_domain);
router.post('/:cid/update_delete_domain/', companyProfileController.update_delete_domain);
router.post('/:cid/update_websitelink/', companyProfileController.update_websitelink);
router.post('/:cid/update_fbpagelink/', companyProfileController.update_fbpagelink);
router.post('/:cid/update_Companycity/', companyProfileController.update_city);
router.post('/:cid/update_Companycountry/', companyProfileController.update_country);
router.post('/:cid/update_Companyname/', companyProfileController.update_name);
router.post('/:cid/update_Companyemail/', companyProfileController.update_email);

////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;
