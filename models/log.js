const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    item:{type:Array}
});

module.exports = mongoose.model("Log", LogSchema);