const Post = require('../models/post');
const Log = require('../models/log');
const User=require('../models/user');
const Company=require('../models/company');
const Comment = require('../models/comment');
const Job = require('../models/job');

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

    console.log(post1._id);
    if(type==1)
    {User.updateOne({_id:id},{$push:{posts:post1._id}},function (err,user) {});}
    else if(type==2)
    {Company.updateOne({_id:id},{$push:{posts:post1._id}},function (err,user) {});}


};

exports.post_job= function (req , res) {
    var id=req.params.id;//id of the creator
    var type=req.params.type;//1 for user 2 for company
    let job = new Job(
        {   title: req.body.title,
            madeby: id,
            time:new Date(Date.now()).toTimeString(),//new time
            date:new Date(Date.now()).toDateString(),//new date
            jobtype:req.body.jobtype,
            decription:req.body.description,
            experience: req.body.experience,
            startTime:req.body.starttime,
            endTime:req.body.endtime

        }
    );
    var tagString=req.body.tag;
    var tags= tagString.split(",");
    for(var i=0;i<tags.length;i++)
    {job.tag.push(tags[i]);}

    var domainString=req.body.domain;
    var domains= domainString.split(",");
    for(var i=0;i<domains.length;i++)
    {job.domain.push(domains[i]);}

    job.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('job posted successfully')
    });

    console.log(job._id);
    if(type==1)
    {User.updateOne({_id:id},{$push:{jobsPosted:job._id}},function (err,user) {});}
    else if(type==2)
    {Company.updateOne({_id:id},{$push:{jobsPosted:job._id}},function (err,user) {});}

//////////////creating a new post(normal post) for this job

    if(type==1)
    {
        User.findById({_id: id}).then(function (user) {
            let post = new Post(
                {   content:user.name+" is hiring for "+job.title + " post",
                    madeby: id,
                    posttype:1,
                    jobid:job._id,
                    time:job.time,
                    date:job.date

                }
            );

            post.save(function (err) {
                if (err) {return next(err);}
                //res.send('post Created successfully')
            });

            if(type==1)
            {User.updateOne({_id:id},{$push:{posts:post._id}},function (err,user) {});}
            else if(type==2)
            {Company.updateOne({_id:id},{$push:{posts:post._id}},function (err,user) {});}
        });
    }

    if(type==2)
    {
        Company.findById({_id: id},).then(function (company) {
            let post = new Post(
                {   content:company.name+" is hiring for "+job.title + " post",
                    madeby: id,
                    posttype:1,
                    jobid:job._id,
                    time:job.time,
                    date:job.date

                }
            );
            post.save(function (err) {
                if (err) {return next(err);}
                //res.send('post Created successfully')
            });

            if(type==1)
            {User.updateOne({_id:id},{$push:{posts:post._id}},function (err,user) {});}
            else if(type==2)
            {Company.updateOne({_id:id},{$push:{posts:post._id}},function (err,user) {});}


        });
    }

    ////there will be two buttons
    ////1) view details --> will show the details of job._id (API yet to be created)
    ////2) apply --> user will directly apply for this job (API yet to be created)
};

exports.follow = function (req , res) {
    var id1=req.params.id1;
    var id2=req.params.id2;
    var type=req.params.type;
    //console.log("Working!");
    if(type==1)
    var type1=req.params.type1;
    var type2=req.params.type2;

    if(type1==1)
    {User.updateOne({_id:id1},{$push:{following:id2}},function (err,user) {});}
    else if(type1==2)
    {Company.updateOne({_id:id1},{$push:{following:id2}},function (err,user) {});}

    if(type2==1)
    {User.updateOne({_id:id2},{$push:{followedby:id1}},function (err,user) {});}
    else if(type2==2)
    {Company.updateOne({_id:id2},{$push:{followedby:id1}},function (err,user) {});}
    res.send(id1+" is following "+id2);
    var logItem=req.params.id1 + " started following " + req.params.id2;
    let log= new Log(
        {
            item:logItem,
            user_dest: req.params.id2
        });
    log.save(function(err){
        if(err){
            return next(err);
        }
    });
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
    var data1=[];
    Post.find({tag:{$in: keywords} }, function (err, post) {
        data1.push(post);
    });
    Company.find({name:{$in: keywords} },function(err, company) {
        data1.push(company);
    });
    User.find({name:{$in: keywords} }, function (err, user) {
        data1.push(user);
    });
    var obj = { };
    for (var key in data1) {
        obj[key] = data1[key]
    }
    res.send(obj)
    //res.send(data1);
};

/////////////////////////////////////////////Add Comment API//////////////////////////////////////////////////////////
exports.add_comment = function (req, res) {
    let comment = new Comment(
        {
            articleid: req.params.id,
            comment: req.body.comment,
            user: req.body.user
        }
    );
    comment.save(function (err) {
        if (err) {
            return next(err);
        }
        console.log('comment added successfully');
        res.send(comment);
    });
    var logItem=req.body.user + " Commented on " + req.params.id;
    let log = new Log(
        {
            item:logItem,
            user_src:req.body.user,
            user_dest: req.params.user_dest
        });
    log.save(function (err) {
        if (err) {
            return next(err);
        }
    });

};

////////////////////////////////////////////////////Upvote API///////////////////////////////////////////////////////
exports.upvotepost = function (req , res) {
    var aid=req.params.aid;
    var user=req.body.user;
    var user_dest=req.params.user_dest;
    Post.findById({_id:aid.toString()}, function(err,post)
    {
        Post.updateOne({_id:aid.toString()},{$set:{upvote:post.upvote+1}}, function(err, res)
        {console.log("upvote post done");});

    });
    //res.send("Upvote  Done!");
    Post.findById(req.params.aid, function(err,post)
    {
        post.upvote++;
        res.send(post);
    });
    var logItem=req.params.user + " Upvoted on " + req.params.aid;
    let log= new Log(
        {
            item:logItem,
            user_src:req.body.user,
            user_dest: req.params.user_dest
        });
    log.save(function(err){
        if(err){
            return next(err);
        }
    });
};

//////////Notifications
exports.notification = function(req,res){
    var user=req.params.user;
    var data1=[ ];
    Log.find({user_dest:{$in: user}}, function(err,logs){
        res.send(logs);
    })
}