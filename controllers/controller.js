const Post = require('../models/post');
//const Log = require('../models/log');
const User=require('../models/user');
const Company=require('../models/company');

exports.post_create = function (req, res) {//call the same api for creating work experiences.
    if(req.file)
    {  console.log("uploading file");
        var uploadfile=req.file.filename;
    }
    else {
        console.log("no file uploaded");
        var uploadfile='nofile.pdf';
    }
    var id=req.params.id;
    var type=req.params.type;
    let post1 = new Post(
        {   content: req.body.content,
            madeby: id,
            time:new Date(Date.now()).toTimeString(),//new time
            date:new Date(Date.now()).toDateString()//new date

        }
    );
    var tagString=req.body.tag;
    var tags= tagString.split(",");
    for(var i=0;i<tags.length;i++)
    {post1.tag.push(tags[i]);}

    post1.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('post Created successfully')
    });
   /* var logItem=req.body.username + " created a new post";
    let log = new Log(
        {
            item:logItem
        });
    log.save(function (err) {
        if (err) {
            return next(err);
        }
    })*/
   // res.send('Create_Post route working!')

    /*var postid=post1._id;
    Post.find({content:req.body.content , madeby:id}).then(function (post) {
       // res.send(posts);
        postid=post._id;
    });*/
    console.log(post1._id);
    if(type==1)
    {User.updateOne({_id:id},{$push:{posts:post1._id}},function (err,user) {});}
    else if(type==2)
    {Company.updateOne({_id:id},{$push:{posts:post1._id}},function (err,user) {});}


};


exports.show_posts = function (req , res) {
    Post.find({}).then(function (posts) {
        res.send(posts);
    });
};
/*exports.show_posts = function (req , res) {
    res.send('postman is working')
};
*/
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
    let data1=[];
    let data2=[];
    let data3=[];
    Post.find({tag:{$in: keywords} }, function (err, post) {
        data1.push(post);
    });
    Company.find({name:{$in: keywords} },function(err, company) {
        data2.push(company);
    });
    User.find({name:{$in: keywords} }, function (err, user) {
        data3.push(user);
    });
    res.send(data1,data2,data3);
};

