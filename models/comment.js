var mongoose = require("mongoose");

//DB Schema
var commentSchema = new mongoose.Schema({
   text: String, 
   author: String
});



module.exports = mongoose.model('Comment', commentSchema);