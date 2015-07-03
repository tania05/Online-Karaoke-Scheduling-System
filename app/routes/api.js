var User		= require('../models/user');
var jwt 		= require('jsonwebtoken');
var config 	= require('../../config');
var async 	= require('async');
var crypto  = require('crypto');
var nodemailer  = require('nodemailer');

//super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {
	
    var apiRouter = express.Router();

    // =================
    // TEST MIDDLEWARE
    // does nothing except write to the console
    // need to change this to middleware to verify a token (in comments below)
    // =================

    apiRouter.use(function(req, res, next){

        //log each request to the console
        console.log(req.method, req.url);

        // continue what we were doing and go to the route
        next();
    });


    // route middleware to validate :name
    apiRouter.param('name', function(req, res, next, name) {
        // do validation on name here
        // blah blah validation
        // log something so we know its working
        console.log('doing name validations on ' + name);

        // once validation is done save the new item in the req
        req.name = name;
        // go to the next thing
        next(); 
    });

    //=====================
    // END TEST MIDDLEWARE
    //===================== 



    //test route to make sure everythign is working
    // accessed at GET http:localhost:8080/api
    apiRouter.get('/', function(req, res){
        res.json({message: 'Welcome to our api.'});
    });



    // on routes that end in /users
    // ----------------------------------------------------
    apiRouter.route('/users')

        // get all users
        .get(function(req, res) {
            User.find({}, function(err, users) {
                if (err) res.send(err);

                // return all users users
                res.json(users);
            });
        })


        // create a user
        .post(function(req, res) {

            var user = new User();      // create a new instance of the User model
            user.name = req.body.name;  // set the users name (comes from the request)
            user.username = req.body.username;  // set the users username (comes from the request)
            user.password = req.body.password;  // set the users password (comes from the request)
            user.email = req.body.email;  // set the users email (comes from the request)
            user.age = req.body.age;  // set the users age (comes from the request)
            user.address = req.body.address;  // set the users address (comes from the request)
            user.phone_number = req.body.phone_number;  // set the users phone_number (comes from the request)


            user.save(function(err) {
                if (err) {
                    /* TEMPORARILY COMMENTED OUT TO GET MORE DETAILED ERROR INFO
                    // duplicate entry
                    if (err.code == 11000) 
                        return res.json({ success: false, message: 'A user with that username already exists. '});

                    else 
                    */
                        return res.send(err);
                }
                // return a message
                res.json({message: 'User created.'});
            });
        });




    // on routes that end in /users/:user_id
    // ----------------------------------------------------
    apiRouter.route('/users/:user_id')

        // get the user with that id
        .get(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {
                if (err) return res.send(err);

                // return that user
                res.json(user);
            });
        })

        // update the user with this id
        .put(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {

                if (err) return res.send(err);

                // set the new user information if it exists in the request
                if (req.body.name) user.name = req.body.name;
                if (req.body.username) user.username = req.body.username;
                if (req.body.password) user.password = req.body.password;
                if (req.body.email) user.email = req.body.email;
                if (req.body.age) user.age = req.body.age; 
                if (req.body.address) user.address = req.body.address; 
                if (req.body.phone_number) user.phone_number = req.body.phone_number;

                // save the user
                user.save(function(err) {
                    if (err) return res.send(err);

                    // return a message
                    res.json({ message: 'User updated!' });
                });

            });
        })

        // delete the user with this id
        .delete(function(req, res) {
            User.remove({
                _id: req.params.user_id
            }, function(err, user) {
                if (err) return res.send(err);

                res.json({ message: 'Successfully deleted' });
            });
        });


		apiRouter.route('/pwResetForgot')


				.post(function(req, res, next) {
  					async.waterfall([
    					function(done) {
      					crypto.randomBytes(20, function(err, buf) {
        					var token = buf.toString('hex');
        					done(err, token);
      					});
    					},
    					function(token, done) {
								User.findOne({ email: req.body.email }, function(err, user) {
        					if (!user) {
          					return res.json({ 
															success: false,
															message: 'No user with that email was found' 
													 })
          					
        					}
									
        					user.passwordResetToken = token;
       		 				user.passwordResetExpires = Date.now() + 3600000; // 1 hour

        					user.save(function(err) {
										if (err) return res.send(err);		
          					done(err, token, user);

        					});
      					});
    					},
    					function(token, user, done) {
      					var smtpTransport = nodemailer.createTransport('SMTP', {
        					service: 'gmail',
       				  	auth: {
          					user: 'PurpleFoxPassReset@gmail.com',
          					pass: 'Seng2993'
        					}
      					})
      					var mailOptions = {
        					to: user.email,
        					from: 'PurpleFoxPassReset@gmail.com',
        					subject: 'Password Reset',
        					text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          							'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          							'http://' + req.headers.host + '/pwReset/' + token + '\n\n' +
          							'If you did not request this, please ignore this email and your password will remain unchanged.\n'
     						}
      					smtpTransport.sendMail(mailOptions, function(err) {
										return res.json({ 
															success: true,
															message: 'An email has been sent to ' + user.email + ' with further instructions.' 
													 });
      						})
    					}
  				]) 

			})
				
		apiRouter.route('/pwReset/:token')


						.get(function(req, res) {
								User.findOne({ passwordResetToken: req.params.token, passwordResetExpires: { $gt: Date.now() } }, function(err, user) {
    							if (!user) {
      								return res.json({ 
													success: false,
													message: 'Password reset token is invalid or has expired'
											})
    							}
    							return res.json({ success: true }) ;
  							});					
						})


						.post(function(req, res) {
  						async.waterfall([
    						function(done) {
      						User.findOne({ passwordResetToken: req.params.token, passwordResetExpires: { $gt: Date.now() } }, function(err, user) {
        						if (!user) {
          						return res.json({ 
													success: false,
													message: 'Password reset token is invalid or has expired'
											})
       							 }
										
        						user.password = req.body.password;
        						user.passwordResetToken = undefined;
        						user.passwordResetExpires = undefined;

        						user.save(function(err) {
            				done(err, user);
        						});
      						});
    						},
    						function(user, done) {
      						var smtpTransport = nodemailer.createTransport('SMTP', {
        					service: 'gmail',
       				  	auth: {
          					user: 'PurpleFoxPassReset@gmail.com',
          					pass: 'Seng2993'
        					}
      					})
      						var mailOptions = {
        							to: user.email,
        							from: 'PurpleFoxPassReset@gmail.com',
        							subject: 'Password Reset',
        							text: 'Hello ' + user.name + ',\n\n' +
          									'This is a confirmation that the password for your account has just been changed. You may now log in with your new password at:\n\n' +
														'http://' + req.headers.host + '/login'
      						};
      						smtpTransport.sendMail(mailOptions, function(err) {
        					return res.json({ 
															success: true,
															message: 'Your password has been successfully changed and an email has been sent to ' + user.email + ' with further instructions.' 
													 });
      						});
    						}
  ]);
});
						


    // route to authenticate a user	(POST http://localhost:8080/api/authenticate)
	apiRouter.post('/authenticate', function (req,res){
	    console.log(req.body.username);
	
        //find the user
        //select the password explicitly since mongoose is not returning it by default
	    User.findOne({
		    username: req.body.username		
		}).select('_id name username password').exec(function(err,user){
		
            if(err) throw err;
		
            //no user with that username was found
	    	if (!user) {
    		    res.json({
			        success: false,
		    	    message: 'Authentication failed. User not found.'	
	    		});
    		} else if (user) {

                // check if password matches
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                } else {

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        username: user.username
                    }, superSecret, {
                      expiresInMinutes: 1440 // expires in 24 hours
                    });
		    	
	        	    //return the information including token as JSON	
    		    	res.json({
			        	success: true,
    	    			message: 'enjoy your token!',
	        			token: token,
                        userData: user
    		    	});	
			    }
		    }	
	    });	
    });

    
    // route middleware to verify a token 
    apiRouter.use(function (req, res, next){
	    //do logging
    	console.log('Somebody just came to our app!');

	    //check header or url parameters or post parameters for token
    	var token =req.body.token || req.param('token') || req.headers['x-access-token'];

	    //decode token
    	if (token) {

    		// verifies secret and checks exp
	    	jwt.verify(token, superSecret, function(err, decoded) {
		    	if (err){
			    	return res.json({
				    	success : false,
    					message : 'Failed to authenticate token'
	    			});
    			} else {
				
				    //if everything is good, save to request for use in other routes
    				req.decoded= decoded;
			
	    			next();
				}
	    	});
    	} else {

		    //if there is no token
    		// return an HTTP response of 403 (access forbidden) and an error message
	    	return res.status(403).send({
		    	success: false,
			    message: 'No token provided.'
    		});
    	}
    });

    // api endpoint to get user information
    apiRouter.get('/me', function(req, res) {
        res.send(req.decoded);
    });
    
/*
    
    // on routes that end in /bookings
    // -------------------------------
    apiRouter.route('/bookings')

        // on routes that end in /bookings/:booking_id
        // -------------------------------
        apiRouter.route('/bookings/:booking_id')
        
    // on routes that end in /availability
    // -------------------------------
    apiRouter.route('/availability')
*/
	return apiRouter;
};
