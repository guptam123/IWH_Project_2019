//const Post = require('../models/post');
const Company=require('../models/company');


///////to edit everything//////
//////////////////////////////////////////////////////////////////////////

//add a domain
exports.update_add_domain= function (req , res) {
    var x=req.params.cid;
    var domain=req.body.domain;

    Company.updateOne({_id:x},{$push:{domains:domain}},function (err,user) {
        res.send(domain + " added to Domains");
    });
};

//delete a domain
exports.update_delete_domain= function (req , res) {
    var x=req.params.cid;
    var domain=req.body.domain;

    Company.updateOne({_id:x},{$pull:{domains:domain}},function (err,user) {
        res.send(domain + " deleted from Domains");
    });
};

//update/edit website link
exports.update_websitelink= function (req , res) {//call ths api for qualification2 and qualification3 as well
    var x=req.params.cid;
    var link=req.body.websitelink;

    Company.updateOne({_id:x},{$set:{website:link}},function (err,user) {
        res.send("website link changed to "+link);
    });
};
//update/edit FB page link
exports.update_fbpagelink= function (req , res) {//call ths api for qualification2 and qualification3 as well
    var x=req.params.cid;
    var link=req.body.fbpagelink;

    Company.updateOne({_id:x},{$set:{fbpagelink:link}},function (err,user) {
        res.send("FB page link changed to "+link);
    });
};

//edit city
exports.update_city= function (req , res) {
    var x=req.params.cid;
    var city=req.body.city;

    Company.updateOne({_id:x},{$set:{city:city}},function (err,user) {
        res.send("city changed to "+city);
    });
};

//edit country
exports.update_country= function (req , res) {
    var x=req.params.cid;
    var country=req.body.country;

    Company.updateOne({_id:x},{$set:{country:country}},function (err,user) {
        res.send("country changed to "+country);
    });
};

//update/edit name
exports.update_name= function (req , res) {
    var x=req.params.cid;
    var name=req.body.name;

    Company.updateOne({_id:x},{$set:{name:name}},function (err,company) {
        res.send("name changed to "+name);
    });
};

//update/edit email
exports.update_email= function (req , res) {
    var x=req.params.cid;
    var email=req.body.email;

    Company.updateOne({_id:x},{$set:{email:email}},function (err,company) {
        res.send("email id changed to "+email);
    });
};

/////////////////////////////////////////////////////////////////////////
//write other APIs below
//hire button api shows contact detail for that user.
////show users followed by me
exports.following=function(req,res){
    var id=req.params.cid;
    Company.find({_id:id},'following').then(function (company) {
        res.send(company);
    })
}
////show users following me
exports.followedby=function(req,res){
    var id=req.params.cid;
    Company.find({_id:id},'followedby').then(function (company) {
        res.send(company);
    })
}

//view profile of other users
exports.view_profile_of_user=function(req,res){
    var id1=req.params.cid;//id of company who is viewing other profiles
    var id2=req.params.userid;//id of user jiski dekhni hai profile
    User.find({_id:id2}).then(function(user){
        res.send(user);
    })
}
exports.view_profile_of_company=function(req,res){
    var id1=req.params.cid;//id of company who is viewing other profiles
    var id2=req.params.companyid;//id of user jiski dekhni hai profile
    Company.find({_id:id2}).then(function(company){
        res.send(company);
    })
}

//// company you may know
exports.company_you_may_know=function(req,res) {
    var id=req.params.cid;
    Company.getCompanyById(id, function(err, user) {
        Company.find({_id:{$in: user.following }},function(err,company2)
        {
            res.send(company2);
        })
    })
}

//User of particular skills company must know
const User=require('../models/user');

exports.user_recommended=function(req,res){
    var id=req.params.cid;
    Company.getCompanyById(id, function(err, company) {
        User.find({skills:{$in: company.domains}},function(err,user)
        {
            res.send(user);
        })
    })
}