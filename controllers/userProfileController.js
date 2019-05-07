const Post = require('../models/post');
const User=require('../models/user');
exports.user_profile_updation = function (req, res) {
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
  }
