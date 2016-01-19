
// Dependencies
var User = require( '../../../core/database/schemas/user' );
var crypt = require( '../../../plugins/crypt' );

exports.login = function ( req, username, password, done ){
	if( req.logged() ){
		return done( null, false, req.flash( 'message', 'You are already logged.' ) ); // WTF?
	}

	// asynchronous
	process.nextTick(function() {

		// Lets see if this email exists..
		User.findOne({ 'local.username': username }, function ( err, user ){
			if( err ) return done( err );

			// if no user is found, return the message
			if( ! user ){
				return done( null, false, req.flash( 'message', 'Oops! No user found with that username, try again.' ) );
			}

			// Lets see if password is valid
			if( ! user.validPassword( password ) ){
				done( null, false, req.flash( 'message', 'Oops! Wrong password.' ) );
			}

			else{
				// Lets authenticate the user in session
				user.sessionAuthenticate( user, req, done, 'Login successfull!' );
			}
		});

	});

};

exports.register = function ( req, username, password, done ){
	if( req.logged() ){
		return done( null, false, req.flash( 'message', 'You are already registed' ) ); // WTF??
	}

	if( req.data.terms != 'on' ){
		return done( null, false, req.flash( 'message', 'You must agree to the terms and conditions' ) );
	}

	// asynchronous
	process.nextTick(function() {
		if( req.user ){
			return done( null, req.user );
		}

		// Lets see if this email exists..
		User.findOne({ 'local.email': req.data.email }, function ( err, user ){
			if ( err ) return done( err );

			if( user ){
				return done( null, false, req.flash( 'message', 'That email is already taken, try another one.' ) );
			}

			var user = new User();

			user.local.username = req.data.username;
			user.local.first_name = req.data.first_name;
			user.local.last_name = req.data.last_name;
			user.local.password = crypt.generateHash( password );
			user.local.email = req.data.email;
			user.local.gender = req.data.gender;

			user.save(function ( err ) {
				if( err ) return done( err );

				user.sessionAuthenticate( user, req, done );
			});

		});
		
	});

	// if the user is logged in but has no local user...
	/*

	if ( ! req.user.local.email ) {
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
	}

   else {
		// user is logged in and already has a local user. Ignore signup. (You should log out before trying to create a new user, user!)
		return done(null, req.user);
   }

   */
};
