var User		= require('../models/user');
var jwt 		= require('jsonwebtoken');
var config 	    = require('../../config');
var async 	    = require('async');
var crypto      = require('crypto');
var nodemailer  = require('nodemailer');
var Booking     = require('../models/booking');
var Room        = require('../models/room');

//super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {
	
    var apiRouter = express.Router();


    // =======================================================================
    // AUTHENTICATION ROUTE
    // =======================================================================

    // route to authenticate a user (POST http://localhost:8080/api/authenticate)
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

    // =======================================================================
    // CREATE USER ROUTE
    // =======================================================================

    apiRouter.post('/users', function(req, res) {

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


    // =======================================================================
    // PASSWORD RESET ROUTES
    // =======================================================================

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
                    User.findOne({ email: req.body.email.toLowerCase() }, function(err, user) {
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

        // Checks to see if the reset token is valid
        .get(function(req, res) {
            // finds a user by there token
            User.findOne({ passwordResetToken: req.params.token, passwordResetExpires: { $gt: Date.now() } }, function(err, user) {
                if (!user) {
                    return res.json({ 
                        success: false,
                        message: 'Password reset token is invalid or has expired'
                    })
                }
                // user was found and returning success
                return res.json({ success: true }) ;
            });                 
        })

        // Changes the users password
        .post(function(req, res) {
            async.waterfall([
                function(done) {
                    // finds a User based on the token sent
                    User.findOne({ passwordResetToken: req.params.token, passwordResetExpires: { $gt: Date.now() } }, function(err, user) {
                        // if the token is invalid or expired the submission fails and an error message is sent back
                            if (!user) {
                                return res.json({ 
                                    success: false,
                                    message: 'Password reset token is invalid or has expired'
                                })
                            }
                            //changes the password and resets the tokens
                            user.password = req.body.password;
                            user.passwordResetToken = undefined;
                            user.passwordResetExpires = undefined;

                            user.save(function(err) {
                                done(err, user);
                            });
                        });
                    },
                    // creates a nodemailer object and defines the email to send the message from
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
        

    // on routes that end in /rooms
    // -------------------------------
    apiRouter.route('/rooms')
        .get(function(req, res) {
            Room.find({}, function(err, rooms) {
                if (err) return res.send(err);
 
                res.json(rooms);
            });
        })
        // create a room
        .post(function(req, res) {

            var room = new Room();      // create a new instance of the Room model
            room.name = req.body.name;
            room.capacity = req.body.capacity;
            room.number = req.body.number;

            room.save(function(err) {
                if (err) {
                    // duplicate entry
                    if (err.code == 11000) { 
                        return res.json({
                            success: false,
                            message: 'A room with that number already exists'
                        });
                    }

                    else 
                        return res.send(err);
                }
                // return a message
                res.json({message: 'Room created.'});
            });
        });

    // on routes that end in /rooms/:room_id
    // -------------------------------
    apiRouter.route('/rooms/:room_id')
    
    // delete the room with this id
    .delete(function(req, res) {
        Room.remove({
            _id: req.params.room_id
        }, function(err, booking) {
            if (err) return res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
	
	//gets the rooms to populate
    apiRouter.route('/rooms/capacity')

		.get(function(req, res) {
			var numPeople = req.body.people;
			
			if (numPeople <= 2 )
				numPeople = 2;
			else if (numPeople > 2 && numPeople <= 4 )
				numPeople = 4;
			else if (numPeople > 4 && numPeople <= 8 )
				numPeople = 8;
			else if (numPeople > 8)
				numPeople = 12;


			Room.find({ capacity: numPeople  }, function(err, rooms ){
				if (err) return res.send(err);
				
				res.json(rooms);
 
			});
		});



    // =======================================================================
    // ROUTE MIDDLEWARE to verify a token 
    // =======================================================================

    apiRouter.use(function (req, res, next){
        //do logging
        console.log('Somebody just came to our app!');

        //check header or url parameters or post parameters for token
        var token =req.body.token || req.query.token || req.headers['x-access-token'];

        //decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, superSecret, function(err, decoded) {

                if (err){
                    console.log('Failed to authenticate token');
                    res.status(403).send({
                        success: false,
                        message: 'Failed to authenticate token'
                    });
                } else {
                    console.log('Token authenticated');
                    //if everything is good, save to request for use in other routes
                    req.decoded = decoded;
            
                    next(); // make sure we go to the next routes and don't stop here
                }
            });

        } else {

            console.log('No token provided');
            //if there is no token
            // return an HTTP response of 403 (access forbidden) and an error message
            return res.status(403).send({

                success: false,
                message: 'No token provided.'
            });
        }
    });



    // =======================================================================
    // USER ROUTES
    // =======================================================================

    // get all users
    apiRouter.get('/users', function(req, res) {

            User.find({}, function(err, users) {
                if (err) return res.send(err);

                // return all users users
                res.json(users);
            });
        });


    // on routes that end in /users/:user_id
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



    // on routes that end in /me
    // api endpoint to get user information used on every request.
    // -------------------------------
    apiRouter.get('/me', function(req, res) {
        res.send(req.decoded);
    });

    // =======================================================================
    // AVAILABILITY ROUTES
    // =======================================================================
		
	apiRouter.route('/availability')

		.get(function(req, res){

			Booking.find({ date: req.body.date, inRoom: config.double1 }, function(err, double1) {
				if(err) return res.send(err);		
			})

			Booking.find({ date: req.body.date, inRoom: config.double2 }, function(err, double2) {
				if(err) return res.send(err);		
			})

			Booking.find({ date: req.body.date, inRoom: config.quad1 }, function(err, quad1) {
				if(err) return res.send(err);		
			})

			Booking.find({ date: req.body.date, inRoom: config.quad2 }, function(err, quad2) {
				if(err) return res.send(err);		
			})

			Booking.find({ date: req.body.date, inRoom: config.quad3 }, function(err, quad3) {
				if(err) return res.send(err);		
			})

			Booking.find({ date: req.body.date, inRoom: config.grande1 }, function(err, grande1) {
				if(err) return res.send(err);		
			})

			Booking.find({ date: req.body.date, inRoom: config.grande2 }, function(err, grande2) {
				if(err) return res.send(err);		
			})

			Booking.find({ date: req.body.date, inRoom: config.grande3 }, function(err, grande3) {
				if(err) return res.send(err);		
			})

			Booking.find({ date: req.body.date, inRoom: config.enorme1 }, function(err, enorme1) {
				if(err) return res.send(err);		
			})

			Booking.find({ date: req.body.date, inRoom: config.enorme2 }, function(err, enorme2) {
				if(err) return res.send(err);		
			})
			
			return res.json({
					'double1' : double1,
					'double2' : double2,
					'quad1'   : quad1,
					'quad2'   : quad2,
					'quad3'   : quad3,
					'grande1' : grande1,
					'grande2' : grande2,
					'grande3' : grande3,
					'enorme1' : enorme1,
					'enorme2' : enorme2
			});
		});

	apiRouter.route('/availability/room')

		.get(function(req, res){

			Booking.find({ date: req.body.date, inRoom: config.req.body.roomName }, function(err, avail){ 
				if (err) return res.send(err);

				res.json(avail);			

			});

		});

	apiRouter.route('/availability/equip')

		.get(function(req, res){ 

			var availIPad = 10;
			var availMic  = 10;
			
			Booking.find( {date: req.body.date, $or: [{start: { $gt: req.body.startTime}, start:{ $lt: endTime }}, {end: { $gt: req.body.startTime}, end: {$lt: endTime }} ] }, 'mic' , function(err, mic){
				if(err) return res.send(err);

			})

			Booking.find( {date: req.body.date, $or: [{start: { $gt: req.body.startTime}, start:{ $lt: endTime }}, {end: { $gt: req.body.startTime}, end: {$lt: endTime }} ] }, 'iPad' , function(err, iPad){
				if(err) return res.send(err);

			})

			for (var i = 0; i < mic.length; i++){
				availMic =- mic[i];
			}

			for (var j = 0; j < iPad.length; j++){
				availIPad =- iPad[i];
			}
			
			if (availMic < 0 || availIPad < 0) return res.json({ message: 'broken' });
			
			res.json({ iPads: availIPad, mics: availMic });



			/*Booking.find({ date: req.body.date, start: { $gt: req.body.startTime && $lt: endTime }}, function(err, step1){
				if(err) return res.send(err);
	
			})

			Booking.find({ date: req.body.date, end: { $gt: req.body.startTime && $lt: endTime }}, function(err, step2){
				if(err) return res.send(err);
	
			})*/
			
			 
		});		

	

    // =======================================================================
    // BOOKING ROUTES
    // =======================================================================

    // on routes that end in /bookings
    apiRouter.route('/bookings')

        // get all bookings (for testing purposes)
        .get(function(req, res) {

            Booking.find({}, function(err, bookings) {
                if (err) return res.send(err);

                // return all bookings
                res.json(bookings);
            });

        })   

        // create a booking
        .post(function(req, res) {
            // Lookup the user who is creating the booking
            User.findById(req.decoded._id, function(err, user) {
                if (err) return res.send(err);
                // Find the room id by the room name from the view
                Room.findOne({name : req.body.room}, function(err, room) {
                    if (err) return res.send(err);

                    var booking        = new Booking();      // create a new instance of the Booking model
                    booking.people     = req.body.people;
                    booking.date       = req.body.date;
                    booking.start      = req.body.start;
                    booking.end        = req.body.end;
                    booking.iPad       = req.body.iPad;
                    booking.mic        = req.body.mic;
                    booking.inRoom     = room._id;
                    booking.createdBy  = user._id;

                    booking.save(function(err) {
                        if (err) return res.send(err);
                        // return a message
                        res.json({message: 'Booking created.'});
                    });
                });
            });
            
        });



    // on routes that end in /bookings/:booking_id
    // -------------------------------
    apiRouter.route('/bookings/:booking_id')
        
    // get a specific bookings
    .get(function(req,res) {
        Booking.findById(req.params.booking_id, function(err, booking) {
            if(err) return res.send(err);
                
            // return the booking
            res.json(booking);   
        });
    })
        
    // Update a booking
    .put(function(req, res) {
        Booking.findById(req.params.booking_id, function(err, booking) {
                
            if(err) return res.send(err);

            // set the new booking information if it exists
            if(req.body.people) booking.people = req.body.people;
            if(req.body.date) booking.date = req.body.date;
            if(req.body.start) booking.start = req.body.start;
            if(req.body.end) booking.end = req.body.end;
            if(req.body.inRoom) booking.inRoom = req.body.inRoom;
            if(req.body.createdBy) booking.createdBy = req.body.createdBy;
            if(req.body.iPad) booking.iPad = req.body.iPad;
            if(req.body.mic) booking.mic = req.body.mic;

            // save the booking
            booking.save(function(err) {
                if(err) return res.send(err);

                // return a message
                res.json({ message: 'Booking updated!' });
            });
        });
    })

    // delete the booking with this id
    .delete(function(req, res) {
        Booking.remove({
            _id: req.params.booking_id
        }, function(err, booking) {
            if (err) return res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
        

    // on routes that end in /bookings/:user_id
    // -------------------------------
    apiRouter.route('/allBookings/:user_id')

    //get bookings associated with a specific user
    .get(function(req, res) {
        Booking.find({ createdBy: req.params.user_id}).exec(function(err,bookings){
            if (err) return res.send(err); 
            
            //console.log(bookings);
            // return all bookings found
            return res.json(bookings);
        });
    });

	return apiRouter;
};
