// grab the packages that we need for the user model
var mongoose 	= require('mongoose');
var Schema		= mongoose.Schema;

// student schema
var StudentSchema = new Schema({
	name 					: String,
	math 				: {
		rote : Number,
		num_objects : Number,
		fluent_to 	: Number,
		patterns 		: Boolean,
		num_id 			: Number,
		thinking		: Number,
		two_d_shapes: Number,
		three_d_shapes : Number,
		one_less		: Number,
		one_more		: Number
	},
	ela 				: {
		letters : Number,
		Sounds 	: Number,
		reading_level : String
	},
	comments : [{ type: Schema.Types.ObjectId, ref: "Comment"}]
});
// return the model
module.exports = mongoose.model('Student', StudentSchema);
