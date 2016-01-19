var User = require( '../../../core/database/schemas/user' );

module.exports = function( req, token, refreshToken, profile, done ){

	var fields = {
		'facebook.id': profile.id
	};

	// asynchronous
	process.nextTick(function() {

		// If user its logged with othe account type
		if( req.user ){

			User.findOne( fields, function ( err, user ){
				if( err ) return done( err );

				if( ! user ){

					User.findOne({ _id: req.user._id }, function ( err, user ){
						user.facebook = profile._json;

						user.save(function ( err, userFacebook ){
							done( null, userFacebook );
						});
					});
				} 

				done( null, false, req.flash( 'message', 'That facebook id is already taken.' ) );
			});

		}

		// If user doesnt have any account
		else{

			User.findOne( fields, function ( err, user ){
				if( err ) return done( err );

				// if the user isnt found, create one
				if( ! user ){
					var facebookUser = new User();

					facebookUser.facebook = profile._json;

					facebookUser.save(function ( err, userFacebook ){
						if( err ) return done( err );

						facebookUser.sessionAuthenticate( userFacebook, req, done );

						done( null, userFacebook );
					});

				}
				else{
					user.sessionAuthenticate( user, req, done );
				}

			});

		}

	});

};
