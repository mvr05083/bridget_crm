var User			= require('../models/user');
var Comment			= require('../models/comment');
var jwt				= require('jsonwebtoken');
var config 		= require('../../config');
var secret 		= config.secret;

module.exports = function(app, express){
	//	ROUTES FOR OUR API
	//	=========================
	var apiRouter = express.Router();

	apiRouter.get('/users', function(req,res){
		User.find({}, function(err, users){
			if(err){
				res.status(500).json(err);
			}

			if(users.length == 0) {
				res.json("There are no users!");
			}

			// Return data if no errors
			res.json(users);
		})
	})

	apiRouter.post('/users', function(req, res){
		console.log('Post recieved');
		var newUser = User({
				name 				: "Mike Redmond",
				math 				: {
					rote 						: 2,
					num_objects 		: 25,
					fluent_to 			: 63,
					patterns 				: true,
					num_id 					: 56,
					thinking				: 3,
					two_d_shapes		: 2,
					three_d_shapes 	: 34,
					one_less				: 12,
					one_more				: 12
				},
				ela 				: {
					letters : 4,
					Sounds 	: 5,
					reading_level : "a"
				},
				comments : []
		});

		newUser.save(function(err, user){
			if(err) console.log(err);

			res.json({
				success : true,
				message : "New user created"
			})
		});
	})

	apiRouter.get('/users/:user_id', function(req, res){
		User.findOne({ _id: req.params.user_id })
		.populate('comments')
		.exec(function(err, user){
			if(err) console.log(err);

			res.json({
				success : true,
				message : user
			});
		});
	});

	apiRouter.put('/users/:user_id', function(req, res){
		User.findOneAndUpdate
	})


	apiRouter.post('/users/:user_id/comment', function(req, res){
		User.findOne({_id : req.params.user_id}, function(err, user){
			if(err) console.log(err);

			var newComment = new Comment({
				user_id : req.params.user_id,
				posted_date : new Date(),
				incident_date : new Date(),
				comment_type : "Disciplinary",
				comment_body : "I have had numerous issues with this student"
			});

			// save new comment to get _id to insert into user
			newComment.save(function(err, comment){
				if(err) console.log(err);

				// push the new id to the user comment section
				user.comments.push(comment);
				// save the changes to the user
				user.save(function(err, u){
					if(err) res.json(err);
					res.json({
						success : true,
						message : "Comment created"
					});
				})

			})

		});
	});
	return apiRouter;
}
