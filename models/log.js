const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    item:{type:Array},
    user_dest: String,//the user whose article has been commented, upvoted etc by user_src
    user_src: String//the user who is commenting, following user_dest
});

module.exports = mongoose.model("Log", LogSchema);