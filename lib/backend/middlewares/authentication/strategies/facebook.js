var User = require( '../../../core/database/schemas/user' );

module.exports = function( req, token, refreshToken, profile, done ){

	var fields = {
		'facebook.id': profile.id,
	};

	var result = function ( err, user ){
		if( err ) return done( err );

		// if the account isnt found, create one
		if( ! user ){
			var facebookUser = new User();

			var data = profile._json || false;

			facebookUser.facebook = data;

			facebookUser.local = {
				first_name: data.first_name,
				last_name: data.last_name,
				password: null,
				email: data.email,
				gender: data.gender,
			};

			facebookUser.save(function ( err, account ){
				if( err ) return done( err );

				facebookUser.authenticate( account, req, done );

				done( null, account );
			});

		}
		else{
			account.authenticate( account, req, done );
		}

	};

	// asynchronous
	process.nextTick(function() {
		var reqUser = req.user;

		if( ! reqUser ){
			User.findOne( fields, result );
		}

		else{
			User.findOne( fields, function ( err, user ){
				if( ! reqUser ) return user.createFacebook( req.user, done );

				done( null, false, req.flash( 'message', 'That facebook id is already taken.' ) );
			});
		}

	});

};
