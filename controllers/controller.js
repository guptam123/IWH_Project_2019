const Post = require('../models/post');
const Log = require('../models/log');
const User=require('../models/user');
const Company=require('../models/company');

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

//Direct searching of users
exports.search_people = function(req,res){
    var searchitem = req.body.searchitem;
    var keywords=searchitem.split(" ");
    console.log(searchitem);
    User.find({name:{$in: searchitem} }, function (err, user) {
        res.send(user);
    });
};

//company search implemented
exports.search_company = function(req,res){
    var searchitem = req.body.searchitem;
    //var keywords=searchitem.split(" ");
    console.log(searchitem);
    Company.find({name:{$in: searchitem} },function(err,company) {
        res.send(company);
    });
};

//searching posts containing given tag
exports.search_post = function (req , res) {
    var searchitem=req.body.searchitem;
    var keywords=searchitem.split(" ");
    console.log(searchitem);
    Post.find({tag:{$in: keywords} }, function (err, post) {
        res.send(post);
    });

};

//can search globally i.e. finding a user, company, post tag containing a keyword
//NOT COMPLETED YET!! 
exports.global_search = function (req , res) {
    var searchitem=req.body.searchitem;
    var keywords=searchitem.split(" ");
    console.log(searchitem);
    var data=[];
    Post.find({tag:{$in: keywords} }, function (err, post) {
        data.push(post);
    });
    Company.find({name:{$in: keywords} },function(err, company) {
        data.push(company);
    });
    User.find({name:{$in: keywords} }, function (err, user) {
        data.push(user);
    });
    res.json(data);
};
