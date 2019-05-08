const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    type:{type:Number,default:1},
    name: String,
    age: {type:Number,default:20},
    city: String,
    country:String,
    number: {type:Number, default: 0},
    email:String,
    password:String,
    skills:{type:Array},
    //flag:{type:Boolean ,default:0},
    Qualification1:String,//10th
    Qualification2:String,//12th
    Qualification3:String,//any further qualification
    posts:{type:Array},//post ids created by the user will be stored in this array
    experiences:{type:Array}//create post api will be used for this too.
});

var User=module.exports = mongoose.model("User", UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback){
    var query = {email: email};
    User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        callback(null, isMatch);
    });
}

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}
