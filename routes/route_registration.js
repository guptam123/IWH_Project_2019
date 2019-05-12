const express = require('express');
const router = express.Router();
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


const upload = multer({dest: './uploads'});//upload variable for storing profileimage,destination folder:uploads
const controller = require('../controllers/controller_register');


//router.post('/:type/register/', upload.single('profileimage'),controller.register);// post api ,image variable:profileimage
router.post('/:type/register/', upload.single('profileimage'),controller.validate('register'),controller.register);// post api ,image variable:profileimage
//for sessions
router.post('/:type/login/',controller.login);
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});



router.get('/logout/',controller.logout);//logout api






module.exports = router;
