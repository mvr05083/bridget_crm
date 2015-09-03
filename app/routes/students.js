var Student			= require('../models/student');
var Comment			= require('../models/comment');

module.exports = function(app, express){
	//	ROUTES FOR OUR API
	//	=========================
	var apiRouter = express.Router();

	// STUDENTS
	// =====================
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
		// Look for any field except comments
		var newStudent = new Student({
			name : req.body.name,
			dob: req.body.dob,
			math : {
				rote : req.body.rote,
				num_objects : req.body.num_objects,
				fluent_to : req.body.fluent_to,
				patterns : req.body.patterns,
				num_id : req.body.num_id,
				thinking : req.body.thinking,
				two_d_shapes : req.body.two_d_shapes,
				three_d_shapes : req.body.three_d_shapes,
				one_less : req.body.one_less,
				one_more : req.body.one_more
			},
			ela : {
				letters : req.body.letters,
				sounds : req.body.sounds,
				reading_level : req.body.reading_level
			}
		});

		newStudent.save(function(err, student){
			if(err) console.log(err);

			res.json({
				success : true,
				message : "New student created",
				student : student
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

	apiRouter.delete('/students/:student_id', function(req, res){
		Student.findOne({ _id : req.params.student_id }, function(err, student){
			student.remove(function(err){
				if(err) res.json({ success : false, message : err })
				Comment.remove({ student_id : req.params.student_id }, function(err){
					res.json({ success : true, message : 'User ' + student.name + ' removed.' })
				})

			});
		});
	})

	apiRouter.post('/students/:student_id/comment', function(req, res){
		Student.findOne({_id : req.params.student_id}, function(err, student){
			if(err) console.log(err);

			var newComment = new Comment({
				student_id : req.params.student_id,
				posted_date : new Date(),
				incident_date : new Date(),
				comment_type : req.body.comment_type,
				comment_body : req.body.comment_body
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

	return apiRouter;
}
