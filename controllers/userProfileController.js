const Post = require('../models/post');
const User=require('../models/user');
/*exports.user_profile_updation = function (req, res) {
    let userdata= new User(
        {
            name: req.body.name,
            age: req.body.age,
            city: req.body.city,
            country: req.body.country,
            number: req.body.number,
            mailId: req.body.mailId,
            Qualification1: req.body.Qualification1,
            Qualification2: req.body.Qualification2,
            Qualification3: req.body.Qualification3,

        }
    );
    var skillsString=req.body.skills;
    var skills= skillsString.split(",");
    for(var i=0;i<skills.length;i++)
    {
        //console.log(skills[i]+"\n");
        userdata.skills.push(skills[i]);
    }
    userdata.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User profile updated successfully')
    });
  }*/
  exports.update_add_skill= function (req , res) {
    var x=req.params.uid;
    var skill=req.body.skill;

    User.updateOne({_id:uid},{$push:{skills:skill}},function (err,user) {
        res.send("Skill added");
    });
};
exports.update_delete_skill= function (req , res) {
  var x=req.params.uid;
  var skill=req.body.skill;

  User.updateOne({_id:x},{$pull:{skills:skill}},function (err,user) {
      res.send("skill deleted");
  });
};
exports.add_qualification= function (req , res) {//call ths api for qualification2 and qualification3 as well
  var x=req.params.uid;
  var quali=req.body.quali;

  User.updateOne({_id:x},{$set:{qualification1:quali}},function (err,user) {
      res.send("Qualification added");
  });
};
exports.update_working_hour_start= function (req , res) {
  var x=req.params.uid;
  var wh=req.body.wh;

  User.updateOne({_id:x},{$set:{working_hour_start:wh}},function (err,user) {
      res.send("Updated working hour start");
  });
};
exports.update_working_hour_end= function (req , res) {
  var x=req.params.uid;
  var wh=req.body.wh;

  User.updateOne({_id:x},{$set:{working_hour_end:wh}},function (err,user) {
      res.send("Updated working hour end");
  });
};
//hire button api shows contact detail for that user.
