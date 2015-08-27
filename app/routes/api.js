var Student			= require('../models/student');
var Comment			= require('../models/comment');
var User			= require('../models/user');
var jwt				= require('jsonwebtoken');
var config 		= require('../../config');
var secret 		= config.secret;

module.exports = function(app, express){
	//	ROUTES FOR OUR API
	//	=========================
	var apiRouter = express.Router();

	apiRouter.get('/students', function(req,res){
		Student.find({}, function(err, students){
			if(err){
				res.status(500).json(err);
			}

			if(students.length == 0) {
				res.json("There are no students!");
			}

			// Return data if no errors
			res.json(students);
		})
	})

	apiRouter.post('/students', function(req, res){
		console.log('Post recieved');
		var newStudent = Student({
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

		newStudent.save(function(err, student){
			if(err) console.log(err);

			res.json({
				success : true,
				message : "New student created"
			})
		});
	})

	apiRouter.get('/students/:student_id', function(req, res){
		Student.findOne({ _id: req.params.student_id })
		.populate('comments')
		.exec(function(err, student){
			if(err) console.log(err);

			res.json({
				success : true,
				message : student
			});
		});
	});

	apiRouter.put('/students/:student_id', function(req, res){
		Student.findOneAndUpdate
	})


	apiRouter.post('/students/:student_id/comment', function(req, res){
		Student.findOne({_id : req.params.student_id}, function(err, student){
			if(err) console.log(err);

			var newComment = new Comment({
				student_id : req.params.student_id,
				posted_date : new Date(),
				incident_date : new Date(),
				comment_type : "Disciplinary",
				comment_body : "I have had numerous issues with this student"
			});

			// save new comment to get _id to insert into student
			newComment.save(function(err, comment){
				if(err) console.log(err);

				// push the new id to the student comment section
				student.comments.push(comment);
				// save the changes to the student
				student.save(function(err, u){
					if(err) res.json(err);
					res.json({
						success : true,
						message : "Comment created"
					});
				})

			})

		});
	});

	apiRouter.route('/users')
		.post(function(req,res){
			var user = new User({
				name : req.body.name,
				username : req.body.username,
				password : req.body.password
			});

			user.save(function(err){
				if(err){
					if(err.code == 11000){
						res.json({ success : false, message : "A user with that username already exists" });
					} else {
						res.json({ success : false, message : err });
					}
				}

				res.json({ success: true, message: 'User created!' });

			});
		})

		.get(function(req, res){
			User.find(function(err, users){
				if(err){
					res.json({ success : false, message : err });
				}

				res.json({ success : true, message : users });
			});
		});

	apiRouter.route("/users/:user_id")
		.get(function(req, res){
			User.findById(req.params.user_id, function(err, user){
				if(err){
					res.json({ success : false, message : err });
				}

				res.json({ success : true, message : user });
			});
		})

		.put(function(req, res){
			User.findById(req.params.user_id, function(err, user){
				if(err) res.json({ success: false, message : err })
				
				if(req.body.name) user.name = req.body.name;
				if(req.body.username) user.username = req.body.username;
				if(req.body.password) user.password = req.body.password;

			})
		})

	return apiRouter;
}
