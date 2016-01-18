var Account = require( '../account' );

exports.login = function( req, username, password, done ){
	if( req.isLogged() ){
		return done( null, false, req.flash( 'message', 'You are already logged.' ) ); // WTF?
	}

	var fields = {
		'local.username': username,
	};

	var verifyAccount = function( err, account ){
		if( err ) return done( err );

		// if no account is found, return the message
		if ( ! account ){
			return done( null, false, req.flash( 'message', 'No account found with that username, try again.' ) );
		}

		if ( ! account.validPassword( password ) ){
			return done( null, false, req.flash( 'message', 'Oops! Wrong password.' ) );
		}

		else{
			account.authenticate( account, req, done, 'Login successfull!' );
		}
	}

	// asynchronous
	process.nextTick(function() {
		Account.findOne( fields, verifyAccount );
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

	var saveAccount = function( err, user ){
		if ( err ) return done( err );

		if( ! user ){
			var account = new Account();

			account.local.first_name = username;
			account.local.last_name = req.body.last_name;
			account.local.password = account.generateHash( password );
			account.local.email = req.body.email;
			account.local.gender = req.body.gender;

			account.save(function ( err ) {
				if( err ) return done( err );

				account.authenticate( account, req, done );
			});
		}

		else{
			done( null, false, req.flash( 'message', 'That username is already taken, try another one.' ) );
		}

	};

	// asynchronous
	process.nextTick(function() {
		if( ! req.user ){
			Account.findOne( fields, saveAccount );
		}

		else{
			done( null, req.user );
		}
	});

// if the Account is logged in but has no local account...
	   /*
	   else if ( ! req.user.local.email ) {
		   // ...presumably they're trying to connect a local account
		   // BUT let's check if the email used to connect a local account is being used by another user

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
		   // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
		   return done(null, req.user);
	   }*/
};
