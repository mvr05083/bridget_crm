var User = require('../models/user');
module.exports = function(app, express){
	//	ROUTES FOR OUR API
	//	=========================
	var userRouter = express.Router();

  userRouter.route('/')
    .post(function(req,res){
      var user = new User({
        name : req.body.name,
        username : req.body.username,
        password : req.body.password
      });

      user.save(function(err){
        if(err){
          if(err.code == 11000){
            res.json({
              success : false,
              message : "A user with that username already exists"
            });
          } else {
            res.json({
              success : false,
              message : err
            });
          }
        }

        res.json({
          success: true,
          message: 'User created!'
        });

      });
    })

    .get(function(req, res){
      User.find(function(err, users){
        if(err){
          res.json({
            success : false,
            message : err
          });
        }

        res.json({
          success : true,
          message : users
        });
      });
    });

  userRouter.route("/:user_id")
    .get(function(req, res){
      User.findById(req.params.user_id, function(err, user){
        if(err){
          res.json({
            success : false,
            message : err
          });
        }

        res.json({
          success : true,
          message : user
        });
      });
    })
  

	return userRouter;
}
