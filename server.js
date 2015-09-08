//	BASE SETUP
//	==========================
//	CALL THE PACKAGES --------
var express			= require('express'); // call express
var app 				= express(); //define our app using express
var bodyParser 	= require('body-parser'); // get body-parser
var morgan			= require('morgan'); // used to see requests
var mongoose 		= require('mongoose'); // for working with the MongoDB
// var User 				= require('./app/models/user'); // custom mongoDB Schema
var jwt 				= require('jsonwebtoken');
var config 			= require('./config');
var path 				= require('path');
var http				= require('http');
var secret 			= config.secret;


// 	APP CONFIGURATION --------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
	next();
});

// log all requests to the console
app.use(morgan('dev'));

// connect to our database -------------
mongoose.connect(config.database);

// set static files location
app.use(express.static(__dirname + '/public'));

// REGISTER OUR ROUTES -----------------
// all of our routes will be prefixed with /api
var apiRoutes = require('./app/routes/authenticate')(app, express);
app.use('/api', apiRoutes);

var studentRoutes = require('./app/routes/students')(app, express);
app.use('/api', studentRoutes);

var userRoutes = require('./app/routes/users')(app, express);
app.use('/api', userRoutes);

// Main catchall route -----------------
// Send the users to the front end -----
app.get('*', function(req, res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// START THE SERVER
// ===============================

app.set('port', config.port);
app.set('ip', config.ip);


http.createServer(app).listen(app.get('port') ,app.get('ip'), function () {
    console.log("✔ Express server listening at %s:%d ", app.get('ip'),app.get('port'));
    //server();
});
