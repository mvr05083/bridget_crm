var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  user_id     : {type: Schema.Types.ObjectId, ref: "User"},
  posted_date : Date,
  incident_date : Date,
  comment_type : String,
  comment_body : String
});

module.exports = mongoose.model("Comment", CommentSchema);
