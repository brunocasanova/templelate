var User = require( '../../../core/database/schemas/user' );

module.exports = function( req, token, refreshToken, profile, done ){

	var fields = {
		'facebook.id': profile.id,
	};

	var result = function ( err, user ){
		if( err ) return done( err );

		// if the user isnt found, create one
		if( ! user ){
			var facebookUser = new User();

			var data = profile._json || false;

			facebookUser.facebook = data;

			facebookUser.save(function ( err, user ){
				if( err ) return done( err );

				facebookUser.authenticate( user, req, done );

				done( null, user );
			});

		}
		else{
			user.authenticate( user, req, done );
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
