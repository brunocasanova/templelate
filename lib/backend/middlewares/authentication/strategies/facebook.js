var Account = require( '../account' );

module.exports = function( req, token, refreshToken, profile, done ){

	var fields = {
		'facebook.id': profile.id,
	};

	var result = function ( err, account ){
		if( err ) return done( err );

		// if the account isnt found, create one
		if( ! account ){
			var facebookAccount = new Account();

			facebookAccount.facebook = profile._json || profile._raw;

			facebookAccount.save(function ( err ){
				if( err ) throw err;

				facebookAccount.authenticate( account, req, done );

				return done( null, account );
			});

		}

		return account.authenticate( account, req, done );
	};

	// asynchronous
	process.nextTick(function() {
		var account = req.user;

		if ( ! account ){
			return Account.findOne( fields, result );
		}

		Account.findOne( fields, function ( err, account ){
			if( ! account ) return account.createFacebook( req.user, done );

			done( null, false, req.flash( 'message', 'That facebook id is already taken.' ) );
		});

	});

};
