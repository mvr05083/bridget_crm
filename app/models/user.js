// grab the packages that we need for the user model
var mongoose 	= require('mongoose');
var Schema		= mongoose.Schema;

// user schema
var UserSchema = new Schema({
	admin 			: Boolean,
	active 			: Boolean,
	last_active : Date,
	comments 		: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
	requests 		: [{type: Schema.Types.ObjectId, ref: 'Request'}]
});
// return the model
module.exports = mongoose.model('User', UserSchema);
