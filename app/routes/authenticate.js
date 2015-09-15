var User			= require('../models/user');
var jwt				= require('jsonwebtoken');
var config 		= require('../../config');
var secret 		= config.secret;

module.exports = function(app, express){
	//	ROUTES FOR OUR API
	//	=========================
	var apiRouter = express.Router();
	// AUTHENTICATION
	// - Needs to be first so that all api
	//   URIs are protected
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
		
	apiRouter.route('/authenticate')
		.post(function(req, res){
			User.findOne({
				username : req.body.username
			}).select('name username password')
			.exec(function(err, user){
				if(err) res.json({ succcess : false, message : err })

				if(!user){
					res.json({ success : false, message : "Authentication failed. User not found." })
				} else if (user){
					var validPassword = user.comparePassword(req.body.password);
					if (!validPassword){
						res.json({ success : false, message : 'Authentication failed. Username or password incorrect' })
					} else {
						var token = jwt.sign({
							name : user.name,
							username : user.username
						}, secret, {
							expiresInMinutes : 1440
						});

						res.json({
							success : true,
							message : 'Token created',
							token : token
						});
					}
				}
			});
		});

	// MIDDLEWARE
	// - Prevents un-authenticated users from accessing API
	// =====================
	apiRouter.use(function(req, res, next){
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		if(token){
			jwt.verify( token, secret, function(err, decoded){
				if(err) {
					res.status(403).json({ success : false, message : 'Failed to authenticate token' })
				} else{
					req.decoded = decoded;
					next();
				}
			});
		} else {
			res.status(403).json({ success : false, message : 'No token provided' })
		}
	});

	return apiRouter;
}
