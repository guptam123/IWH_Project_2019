const Post = require('../models/post');
const Log = require('../models/log');
const User=require('../models/user');

exports.post_create = function (req, res) {//call the same api for creating work experiences.
    let post1 = new Post(
        {
            title: req.body.title,
            content: req.body.content,
            username: req.body.username,
            companyid: req.body.companyid,
            upvote: req.body.upvote,

        }
    );
    var tagString=req.body.tag;
    var tags= tagString.split(",");
    for(var i=0;i<tags.length;i++)
    {
        //console.log(tags[i]+"\n");
        post1.tag.push(tags[i]);
    }
    post1.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('post Created successfully')
    });
    var logItem=req.body.username + " created a new post";
    let log = new Log(
        {
            item:logItem
        });
    log.save(function (err) {
        if (err) {
            return next(err);
        }
    })
   // res.send('Create_Post route working!')
   User.updateOne({name:req.body.username},{$push:{posts:req.body.id}},function (err,user) {
       
   });//in user collection,posts array is storing the id of the post created by that username
};
exports.show_posts = function (req , res) {
    Post.find({}).then(function (posts) {
        res.send(posts);
    });
};
exports.show_posts = function (req , res) {
    res.send('postman is working')
};
