var User			= require('../models/user');
var Request		= require('../models/request');
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
			admin : true,
			active : false,
			last_active : new Date(),
			comments : [],
			requests : []
		});

		newUser.save(function(err, user){
			if(err) console.log(err);
			var request = new Request({
				request_date : new Date(),
				last_active : new Date(),
				requestor_id : user,
				assigned_to : user
			});

			request.save(function(err){
				if(err) console.log(err);
				res.json({
					'success': true,
					'message' : 'User created'
				});
			});
			
		});
	})

	apiRouter.get('/requests', function(req, res){
		Request.find()
		.populate('requestor_id')
		.exec(function(err, request){
			if(err) console.log(err);

			for(i in request){
				console.log(request[i].updated_on);
			}
			res.json({
				success : true,
				message : request
			});
		});
	});

	apiRouter.get('/requests/:request_id', function(req, res){
		Request.findOne({_id : req.params.request_id})
		.populate('requestor_id assigned_to', '_id admin')
		.exec(function(err, request){
			if(err) console.log(err);
			res.json({
				success : true,
				message : request
			});
		});
	});
	return apiRouter;
}
