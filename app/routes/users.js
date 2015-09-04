var User			= require('../models/user');

module.exports = function(app, express){
	//	ROUTES FOR OUR API
	//	=========================
	var apiRouter = express.Router();

	// USERS
	// =====================
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

				user.save(function(err){
					if(err) res.json({ success : false, message : err})

					res.json({ success: true, message : "User updated!" })
				});
			});
		})
		.delete(function(req, res){
			User.remove({ _id : req.params.user_id }, function(err, user){
				if(err) res.json({ success : false, message : err })

				res.json({ success : true, message : "User deleted." })
			});
		})

	// Returns logged in user information
	// ==============================
	apiRouter.get('/me', function(req, res){
		res.json({ success : true, message : req.decoded });
	})

	return apiRouter;
}
