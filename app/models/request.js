var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = Schema({
  request_date      : Date,
  updated_on        : Date,
  requestor_id      : {type: Schema.Types.ObjectId, ref: 'User'},
  comments          : [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  assigned_to       : {type: Schema.Types.ObjectId, ref: 'User'},
  request_body      : String,
  request_type      : String,
  request_due_date  : Date,
  request_status    : String
});

requestSchema.pre('save', function(next){
  var currentDate = new Date();

  this.updated_on = currentDate;

  if(!this.request_date){
    this.request_date = currentDate;
  }

  next();
});

module.exports = mongoose.model('Request', requestSchema);
