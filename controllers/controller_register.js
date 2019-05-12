var express = require('express');
var router = express.Router();
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');//User collection with user.js schema
var Company = require('../models/company');//Company collection with company.js schema
const { check, validationResult } = require('express-validator/check');

//LOGIN FUNCTION

exports.login=function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var type=req.params.type;
    if(type==1){
        User.getUserByEmail(email, function(err, user){ //getUserByEmail() function is defined in user.js file

            if(err)
            {console.log(err);
                throw err;}

            if(user==null){
                res.send('Unknown User');
            }
            if(user)
            {
                User.comparePassword(req.body.password, user.password, function(err, isMatch){//.comparePassword is defined in user.js file
                    if(err) return done(err);
                    if(isMatch){
                        res.send(user);
                        console.log('You are now logged in as a user');
                        //  res.send('You are now logged in');
                    } else {
                        res.send('Invalid Password');
                    }
                });
            }//If user has emailid which is present in database then password is matched.

        });}
    if(type==2){
        Company.getCompanyByEmail(email, function(err, company){ //getUserByEmail() function is defined in Company.js file

            if(err)
            {console.log(err);
                throw err;}

            if(company==null){
                res.send('Unknown User');
            }
            if(company)
            {
                Company.comparePassword(req.body.password, company.password, function(err, isMatch){//.comparePassword is defined in company.js file
                    if(err) return done(err);
                    if(isMatch){
                        res.send(company);
                        console.log('You are now logged in as a company');
                        //  res.send('You are now logged in');
                    } else {
                        res.send('Invalid Password');
                    }
                });
            }//If user has emailid which is present in database then password is matched.

        });}
    /*
    if(type==3){Org.getOrgByEmail(email, function(err, org){ //getUserByEmail() function is defined in user.js file

        if(err)
        {console.log(err);
            throw err;}

        if(user==null){
            res.send('Unknown User');
        }
        if(user)
        {
            User.comparePassword(req.body.password, user.password, function(err, isMatch){//.comparePassword is defined in user.js file
                if(err) return done(err);
                if(isMatch){
                    res.send(user);
                    console.log('You are now logged in');
                    //  res.send('You are now logged in');
                } else {
                    res.send('Invalid Password');
                }
            });
        }//If user has emailid which is present in database then password is matched.

    });}
    */
}


//REGISTER FUNCTION
exports.validate = (method) => {
//var type= req.params.type;

    switch (method) {

        case 'register': {
            return [
                check('name', 'name required').not().isEmpty(),
                check('city', 'city required').not().isEmpty(),
                check('country', 'country required').not().isEmpty(),
                check('email', 'email required').not().isEmpty(),
                check('email', 'Invalid email').isEmail(),
                check('password', 'password required').not().isEmpty(),
                check('password2', 'retype password').not().isEmpty(),


            ]
        }
    }

}

exports.register = (req, res, next) => {
    var c = 0;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        c = 1;
        res.send(errors.array().map(x => `${x.msg}`));
        return;

    }

    var type = req.params.type;
    var name = req.body.name;
    var city = req.body.city;
    var country = req.body.country;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    var skillString = req.body.skills;
    var domainString = req.body.domains;

    if (req.file) {
        console.log('Uploading File...');
        var profileimage = req.file.filename;
    } else {
        console.log('No File Uploaded...');
        var profileimage = 'noimage.jpg';
    }

    if(type==1){
        User.findOne({email: req.body.email}, function (err, user) {//to check if email is already present in database

            //if a user was found, that means the user's email matches the entered email
            if (user) {
                c = 1;
                console.log('invalid email');
                res.send('email already registered.');
                return;
            } else {
                var newUser = new User({
                    name: name,
                    email: email,
                    city: city,
                    country: country,
                    password: password,
                    profileimage: profileimage
                });

                if(skillString==null){res.send('enter skills');return;}
                else {
                    var skill = skillString.split(",");
                    for (var i = 0; i < skill.length; i++) {//console.log(skill[i]+"\n");
                        newUser.skills.push(skill[i]);
                    }
                    if(password!=password2){
                        res.send('passwords donot match');return;
                    }
                    else{User.createUser(newUser, function (err, user) {//Create user function is defined in user.js, it encrypts the password and stores it in db
                        if (err) {
                            res.send(err);
                        }
                        res.send(user);
                        return;

                    });}


                }
            }


        });
    }

    if(type==2){
        Company.findOne({email: req.body.email}, function (err, user) {//to check if email is already present in database

            //if a user was found, that means the user's email matches the entered email
            if (user) {
                c = 1;
                console.log('invalid email');
                res.send('email already registered.');
                return;
            } else {
                var newCompany = new Company({
                    name: name,
                    email: email,
                    city: city,
                    country: country,
                    password: password,
                    profileimage: profileimage
                });

                if(domainString==null){res.send('enter domains');return;}
                else {
                    var domain = domainString.split(",");
                    for (var i = 0; i < domain.length; i++) {//console.log(skill[i]+"\n");
                        newCompany.domains.push(domain[i]);
                    }
                    if(password!=password2){
                        res.send('passwords donot match');return;
                    }
                    else{Company.createCompany(newCompany, function (err, user) {//Create user function is defined in user.js, it encrypts the password and stores it in db
                        if (err) {
                            res.send(err);
                        }
                        res.send(user);
                        return;

                    });}


                }
            }


        });
    }
}


/*
exports.register=function(req, res, next) {
    var type=req.params.type;
    var name = req.body.name;
    var city = req.body.city;
    var country = req.body.country;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    var skillString=req.body.skills;
    var domainString=req.body.domains;





    if (req.file) {
        console.log('Uploading File...');
        var profileimage = req.file.filename;
    } else {
        console.log('No File Uploaded...');
        var profileimage = 'noimage.jpg';
    }
    if(type==1) {// Form Validator
        req.checkBody('name', 'Name field is required').notEmpty();
        req.checkBody('email', 'Email field is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail().withMessage('Email id is not valid');
        req.checkBody('city', 'city field is required').notEmpty();
        req.checkBody('country', 'country field is required').notEmpty();
        req.checkBody('password', 'Password field is required').notEmpty();
        req.checkBody('password2', 'Passwords do not match').equals(req.body.password).withMessage('Passwords do not match');
        var errors = req.validationErrors();//if it has validation errors then missing parameter is shown
        if (errors) {
            res.status(400).send({"message": "Missing parameter"});
        } else {
            User.findOne({email: req.body.email}, function (err, user) {//to check if email is already present in database
                if (err) {
                    res.send(err);
                }
                //if a user was found, that means the user's email matches the entered email
                if (user) {
                    var err = new Error('A user with that email has already registered. Please use a different email..');
                    err.status = 400;
                    console.log('invalid email');
                    res.send('A user with that email has already registered. Please use a different email..');
                    return next(err);
                } else {
                    var newUser = new User({
                        name: name,
                        email: email,
                        city: city,
                        country: country,
                        password: password,
                        profileimage: profileimage
                    });
                    if(skillString!=null)
                    {var skill= skillString.split(",");
                        for (var i = 0; i < skill.length; i++)
                        {//console.log(skill[i]+"\n");
                            newUser.skills.push(skill[i]);
                        }
                    }

                    User.createUser(newUser, function (err, user) {//Create user function is defined in user.js, it encrypts the password and stores it in db
                        if (err) {
                            res.send(err);
                        }
                        res.send("You are registered");

                    });
                }

            });
        }
    }
    else if(type==2) {// Form Validator
        req.checkBody('name', 'Name field is required').notEmpty();
        req.checkBody('email', 'Email field is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail().withMessage('Email id is not valid');
        req.checkBody('city', 'city field is required').notEmpty();
        req.checkBody('country', 'country field is required').notEmpty();
        req.checkBody('password', 'Password field is required').notEmpty();
        req.checkBody('password2', 'Passwords do not match').equals(req.body.password).withMessage('Passwords do not match');
        var errors = req.validationErrors();//if it has validation errors then missing parameter is shown
        if (errors) {
            res.status(400).send({"message": "Missing parameter"});
        } else {
            Company.findOne({email: req.body.email}, function (err, company) {//to check if email is already present in database
                if (err) {
                    res.send(err);
                }
                //if a company was found, that means the company's email matches the entered email
                if (company) {
                    var err = new Error('A company with that email has already registered. Please use a different email..');
                    err.status = 400;
                    console.log('invalid email');
                    res.send('A company with that email has already registered. Please use a different email..');
                    return next(err);
                } else {
                    var newCompany = new Company({
                        name: name,
                        email: email,
                        city: city,
                        country: country,
                        password: password,
                        profileimage: profileimage
                    });
                    if(domainString!=null)
                    {var domain= domainString.split(",");
                        for (var i = 0; i < domain.length; i++)
                        {console.log(domain[i]+"\n");
                            newCompany.domains.push(domain[i]);
                        }
                    }

                    Company.createCompany(newCompany, function (err, company) {//createCompany function is defined in company.js, it encrypts the password and stores it in db
                        if (err) {
                            res.send(err);
                        }
                        res.send("You are registered");

                    });
                }

            });
        }
    }
}*/

//LOGOUT FUNCTION
exports.logout=function(req, res){
    req.logout();
    res.send('You are now logged out');
}
