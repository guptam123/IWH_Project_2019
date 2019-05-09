const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const CompanySchema = new mongoose.Schema({
    type:{type:Number,default:2},
    name: String,
    city: String,
    country:String,
    email:String,
    password:String,
    domains:{type:Array},
    website:String,
    fbpagelink:String,
    following:{type:Array},//_ids of other users/companies/orgs followed by the user
    followedby:{type:Array},//ids of those who are following me
    posts:{type:Array},//post ids created by the user will be stored in this array
    jobsPosted:{type:Array},//_ids of jobs posted
    about: String//The description of company

});

var Company=module.exports = mongoose.model("Company", CompanySchema);



module.exports.getCompanyById = function(id, callback){
    Company.findById(id, callback);
}

module.exports.getCompanyByEmail = function(email, callback){
    var query = {email: email};
    Company.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        callback(null, isMatch);
    });
}

module.exports.createCompany = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}
