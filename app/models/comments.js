var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = Schema({
  posted_on  : Date,
  updated_on : Date,
  comment_body : String,
  user_id       : {type: Schema.Types.ObjectId, ref: 'User'},
  request_id    : {type: Schema.Types.ObjectId, ref: 'Request'}
});

commentSchema.pre('save', function(next){
  var currentDate = new Date();

  this.updated_on = currentDate;

  if(!this.posted_on){
    this.posted_on = currentDate;
  }

  next();
});

module.exports = mongoose.model('Request', requestSchema);
