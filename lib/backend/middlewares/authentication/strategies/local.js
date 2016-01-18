var User = require( '../../../core/database/schemas/user' );

exports.login = function( req, username, password, done ){
	if( req.isLogged() ){
		return done( null, false, req.flash( 'message', 'You are already logged.' ) ); // WTF?
	}

	var fields = {
		'local.username': username,
	};

	var verifyUser = function( err, user ){
		if( err ) return done( err );

		// if no user is found, return the message
		if ( ! user ){
			return done( null, false, req.flash( 'message', 'No user found with that username, try again.' ) );
		}

		if ( ! user.validPassword( password ) ){
			done( null, false, req.flash( 'message', 'Oops! Wrong password.' ) );
		}

		else{
			user.authenticate( user, req, done, 'Login successfull!' );
		}
	}

	// asynchronous
	process.nextTick(function() {
		User.findOne( fields, verifyUser );
	});

};

exports.register = function( req, username, password, done ){
	if( req.isLogged() ){
		return done( null, false, req.flash( 'message', 'You are already registed' ) ); // WTF??
	}

	if( req.body.terms != 'on' ){
		return done( null, false, req.flash( 'message', 'You must agree to the terms and conditions' ) );
	}

	var fields = {
		'local.username': 'username',
	};

	var saveUser = function( err, user ){
		if ( err ) return done( err );

		if( ! user ){
			var user = new User();

			user.local.first_name = username;
			user.local.last_name = req.body.last_name;
			user.local.password = user.generateHash( password );
			user.local.email = req.body.email;
			user.local.gender = req.body.gender;

			user.save(function ( err ) {
				if( err ) return done( err );

				user.authenticate( user, req, done );
			});
		}

		else{
			done( null, false, req.flash( 'message', 'That username is already taken, try another one.' ) );
		}

	};

	// asynchronous
	process.nextTick(function() {
		if( ! req.user ){
			user.findOne( fields, saveUser );
		}

		else{
			done( null, req.user );
		}
	});

// if the user is logged in but has no local user...
	   /*
	   else if ( ! req.user.local.email ) {
		   // ...presumably they're trying to connect a local user
		   // BUT let's check if the email used to connect a local user is being used by another user

		   User.findOne({ 'local.email' :  email }, function(err, user) {
			   if (err)
				   return done(err);

			   if (user) {
				   return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
				   // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
			   } else {
				   var user = req.user;
				   user.local.email = email;
				   user.local.password = user.generateHash(password);
				   user.save(function (err) {
					   if (err)
						   return done(err);

					   return done(null,user);
				   });
			   }
		   });
	   } else {
		   // user is logged in and already has a local user. Ignore signup. (You should log out before trying to create a new user, user!)
		   return done(null, req.user);
	   }*/
};
