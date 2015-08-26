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

	return userRouter;
}
