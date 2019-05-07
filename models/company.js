const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: String,
    city: String,
    country:String,
    website:String,
    //The description of company
    about: String
});

module.exports = mongoose.model("Company", CompanySchema);
