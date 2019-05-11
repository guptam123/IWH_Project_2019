const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    chats:{type:Array},
    username:String
});

module.exports = mongoose.model("chat", ChatSchema);