const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    age: String,
    city: String,
    country:String,
    number: {type:Number, default: 0},
    address:String,
    mailId:String,
    skills:{type:Array},
    //flag:{type:Boolean ,default:0},
    Qualification1:String,//10th
    Qualification2:String,//12th
    Qualification3:String,//any further qualification
    posts:{type:Array},//post ids created by the user will be stored in this array
    experiences:{type:Array},//create post api will be used for this too.
    working_hour_start:{type:Number},
    working_hour_end:{type:Number}
});

module.exports = mongoose.model("User", UserSchema);
