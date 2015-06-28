var User	= require('../models/user')
var jwt 	= require('jsonwebtoken')
var config 	= require('../../config')

//super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {
	
    var apiRouter = express.Router();

    // route to authenticate a user	(POST http://localhost:8080/api/authenticate)
	apiRouter.post('/authenticate', function (req,res){
	    console.log(req.body.username);
	
        //find the user
        //select the password explicitly since mongoose is not returning it by default
	    User.findone({
		    username: req.body.username		
		}).select('password').exec(function(err,user){
		
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

		            //if the user is found and the password is right,
    	    	    //create a token. 
	        		var token= jwt.sign(user.superSecret,{
    		    		expiresInMinutes: 1440 //expires in 24 hours
    		    	});
		    	
	        	    //return the information including token as JSON	
    		    	res.json({
			        	success: true,
    	    			message: 'enjoy your token!',
	        			token: token
    		    	});	
			    }
		    }	
	    });	
    });

    // route middleware to verify a token 
    apiRouter.use(function (req, res, next){
	    //do logging
    	config.log('Somebody just came to our app!');

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


    //test route to make sure everythign is working
    // accessed at GET http:localhost:8080/api
    apiRouter.get('/', function(req, res){
    	res.json({message: 'hooray! Welcome to our api!'});
    });

    // on routes that end in /users
    // -------------------------------
    apiRouter.route('/users')

    	.get(function(req, res) {
	    	User.find({}, function(err, users) {
		    	if (err) res.send(err);

    			// return all users users
	    		res.json(users);
    		});
    	});

        // on routes that end in /users/registration
        // -------------------------------
        apiRouter.route('/users/registration')

    	    .post(function(req,res){

		        var user = new User();              // create a new instance of the User module
        		user.name = req.body.name;          // set the user's name
	        	user.username = req.body.username;  // set the username
		        user.password = req.body.password;  // set the user's password
                user.email = req.body.email;        // set the user's email
                user.age = req.body.age;            // set the user's age
                user.phone_number = req.body.phone_number;  // set the user's phone_number
                user.address = req.body.address;    // set the user's address
    
        		user.save(function(err){
    	    		if(err) res.send(err);
    
                    // return a message
    	    	    res.json({message: 'User Created!'});
    	    	});
        	})

    	// on routes that end in /users/:user_id
	    //----------------------------------------
    	apiRouter.route('/users/:user_id')

	        // get the user with that id
        	.get(function (req, res){
        		User.findById(req.params.user_id, function(err,user){
        			if(err) res.send(err);

		        	//return that user
        			res.json(user);
    		    });
        	})

            //Update the user with this id
	        .put(function(req,res){
        		User.FindById(req.params.user_id, function(err,user){

	        		if(err) res.send(err);

            		//set the new user information if it exists in the request
	            	if(req.body.name) user.name= req.body.name;
            		if(req.body.username) user.username= req.body.username;
	            	if(req.body.password) user.password = req.body.password;
                    if(req.body.email) user.email = req.body.email;
                    if(req.body.age) user.age = req.body.age;
                    if(req.body.phone_number) user.phone_number = req.body.phone_number;
                    if(req.body.address) user.address = req.body.address;

            		//save the user
    	        	user.save(function(err){
            			if(err) res.send(err);

        	    		//return a message
            			res.json({ message: 'User Updated!' });
                  	});
            	});
            })

        	//delete the user with this id
        	.delete(function(req,res){
        		User.remove({
        			_id: req.params.user_id
        		}, function (err, user){
        			if(err) res.send(err);

		        	res.json({ message: 'Successfully deleted!' });
        		});
	        });
	return apiRouter;
};
