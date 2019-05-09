const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

    content: String,
    madeby: String,//_id of the creator
    upvote: {type:Number, default: 0 },
    tag:{type:Array},
    time:String,
    date:String,
    posttype:{type:Number , default:0},
    jobid:String,/////to store ids of jobs posted
    //flag:{type:Boolean ,default:0},
    uploadfile:String
});

module.exports = mongoose.model("Post", PostSchema);
