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
router.get('/:aid/:user_dest/upvotepost', controller.upvotepost);
router.post('/:id/:user_dest/add_comment', controller.add_comment);//here user_dest is the user who has written the post
router.post('/:id/:type/post_job/',controller.post_job);//id is _id of the user/comp who posts the job
//router.post('/:id/:type/post_job/',controller.post_job);//id is _id of the user/comp who posts the job
router.post('/:id/show_posts/',controller.show_posts);//id is _id of the user/comp whose posts we wish to see
router.post('/:id1/:id2/apply_for_job',controller.apply_for_job);//id1 --> person applying for job id2-->job
router.post('/:id/view_details_of_job/',controller.view_details_of_job);//id--> job to be viewed


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
router.get('/:user/notification',controller.notification);
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
/////API endpoint for user profile as seen by company/////////
router.get('/:uid/:cid/hire_user',userProfileController.hire_user);

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
///////////////////////////////////////////////////////////////////////////////////////////////


///////////////////following and followed by api end points///////////////////////////////
router.post('/:uid/show_users_followed_by_user/',userProfileController.following);
router.post('/:uid/show_users_following_user/',userProfileController.followedby);


router.post('/:cid/show_company_followed_by_user/',companyProfileController.following);
router.post('/:cid/show_company_following_user/',companyProfileController.followedby);

////////////////////// view profile of other users  and company end points//////////////////////
router.post('/:uid/:userid/view_profile_of_user/',userProfileController.view_profile_of_user);
router.post('/:uid/:companyid/view_profile_of_company/',userProfileController.view_profile_of_company);


router.post('/:cid/:userid/view_profile_of_user/',companyProfileController.view_profile_of_user);
router.post('/:cid/:companyid/view_profile_of_company/',companyProfileController.view_profile_of_company);



///////////////////////people you may know api endpoints///////////////////////////////////
router.post('/:uid/people_you_may_know/',userProfileController.people_you_may_know);
router.post('/:cid/company_you_may_know/',companyProfileController.company_you_may_know);



//////////////////////////recommendations of jobs an users API end points////////////////////
router.post('/:uid/company_recommended/',userProfileController.company_recommended);
router.post('/:cid/user_recommended/',companyProfileController.user_recommended);






module.exports = router;
