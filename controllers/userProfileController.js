//const Post = require('../models/post');
const User=require('../models/user');


///////to edit everything//////
//////////////////////////////////////////////////////////////////////////

//add a skill
  exports.update_add_skill= function (req , res) {
    var x=req.params.uid;
    var skill=req.body.skill;

    User.updateOne({_id:x},{$push:{skills:skill}},function (err,user) {
        res.send(skill + " added to Skills");
    });
};

//delete a skill
exports.update_delete_skill= function (req , res) {
  var x=req.params.uid;
  var skill=req.body.skill;

  User.updateOne({_id:x},{$pull:{skills:skill}},function (err,user) {
      res.send(skill + " deleted from Skills");
  });
};

//add a qualification
exports.add_qualification= function (req , res) {//call ths api for qualification2 and qualification3 as well
  var x=req.params.uid;
  var quali=req.body.qualification;

  User.updateOne({_id:x},{$push:{qualifications:quali}},function (err,user) {
      res.send(quali+" added to Qualifications");
  });
};
//delete a qualification
exports.delete_qualification= function (req , res) {
  var x=req.params.uid;
  var quali=req.body.qualification;

  User.updateOne({_id:x},{$pull:{qualifications:quali}},function (err,user) {
    res.send(quali+" deleted from Qualifications");
  });
};

//edit/update working_hour_end
exports.update_working_hour_start= function (req , res) {
  var x=req.params.uid;
  var starting_hour=req.body.starting_hour;

  User.updateOne({_id:x},{$set:{working_hour_start:starting_hour}},function (err,user) {
      res.send("available from"+starting_hour);
  });
};
//edit/update working_hour_end
exports.update_working_hour_end= function (req , res) {
  var x=req.params.uid;
  var ending_hour=req.body.ending_hour;

  User.updateOne({_id:x},{$set:{working_hour_end:ending_hour}},function (err,user) {
      res.send("available till "+ending_hour);
  });
};
//edit age
exports.update_age= function (req , res) {
  var x=req.params.uid;
  var age=req.body.age;

  User.updateOne({_id:x},{$set:{age:age}},function (err,user) {
    res.send("age changed to"+age);
  });
};

//edit city
exports.update_city= function (req , res) {
  var x=req.params.uid;
  var city=req.body.city;

  User.updateOne({_id:x},{$set:{city:city}},function (err,user) {
    res.send("city changed to"+city);
  });
};

//edit country
exports.update_country= function (req , res) {
  var x=req.params.uid;
  var country=req.body.country;

  User.updateOne({_id:x},{$set:{country:country}},function (err,user) {
    res.send("country changed to"+country);
  });
};

//update/edit phone number
exports.update_phoneNumber= function (req , res) {
  var x=req.params.uid;
  var phone=req.body.phone_number;

  User.updateOne({_id:x},{$set:{phone:phone}},function (err,user) {
    res.send("phone number changed to"+phone);
  });
};

//update/edit name
exports.update_name= function (req , res) {
  var x=req.params.uid;
  var name=req.body.name;

  User.updateOne({_id:x},{$set:{name:name}},function (err,user) {
    res.send("name changed to"+name);
  });
};

//update/edit email
exports.update_email= function (req , res) {
  var x=req.params.uid;
  var email=req.body.email;

  User.updateOne({_id:x},{$set:{email:email}},function (err,user) {
    res.send("email id changed to "+email);
  });
};

/////////////////////////////////////////////////////////////////////////
//write other APIs below
//hire button api shows contact detail for that user.
exports.hire_user=function(req,res)//hiring user dierctly(by company)
{
  var uid=req.params.uid;
  var cid=req.params.cid;
  User.find({_id:uid}).then(function(user){
    res.send(user);
  })
  ////For notification
  var logItem=req.params.cid + " Tried to click the hire button for " + req.params.uid;
  let log= new Log(
      {
          item:logItem,
          user_src:req.body.cid,
          user_dest: req.params.uid
      });
  log.save(function(err){
      if(err){
          return next(err);
      }
  });
}


////show users followed by me
exports.following=function(req,res){
  var id=req.params.uid;
  User.find({_id:id},'following').then(function (User) {
    res.send(User);
  })
}
////show users following me
exports.followedby=function(req,res){
  var id=req.params.uid;
  User.find({_id:id},'followedby').then(function (user) {
    res.send(user);
  })
}

//view profile of other users
exports.view_profile_of_user=function(req,res){
  var id1=req.params.uid;//id of user who is viewing other profiles
  var id2=req.params.userid;//id of user jiski dekhni hai profile
  User.find({_id:id2}).then(function(user){
    res.send(user);
  })
}

exports.view_profile_of_company=function(req,res){
  var id1=req.params.uid;//id of user who is viewing other profiles
  var id2=req.params.companyid;//id of user jiski dekhni hai profile
  Company.find({_id:id2}).then(function(company){
    res.send(company);
  })
}


//// people you may know
exports.people_you_may_know=function(req,res) {
  var id=req.params.uid;
  User.getUserById(id, function(err, user) {
    User.find({_id:{$in: user.following }},function(err,user2)
    {
      res.send(user2);
    })
  })
}

////company of appropriate skills user must know where he can apply

exports.company_recommended=function(req,res){
  var id=req.params.uid;
  User.getUserById(id, function(err, user) {
    Job.find({domain:{$in: user.skills}},function(err,company)
    {
      res.send(company);
    })
  })
}
