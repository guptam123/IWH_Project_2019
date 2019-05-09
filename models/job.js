const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({

    title:{type:String, required:true},
    domain:{type:Array, required:true},
    decription:String,
    experience:Number,
    jobtype:{type:String, required:true},
    startTime:{type:Number, required:true},
    endTime:Number,
    tag:{type:Array},
    time:String,
    date:String,
    madeby: String,//_id of the creator
    appliedby:{type:Array}//_id of people who applied for the job
});

module.exports = mongoose.model("Job", JobSchema);