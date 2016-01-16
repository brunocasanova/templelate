var Account = require( '../account' );

module.exports = function( token, refreshToken, profile, done ){

	var fields = {
		'google.id' : profile.id
	};

	var result = function( err, user ){
		if( err ){
			return done( err );
		}

		if( user ){
			return done( null, user );
		}

		else{
			var account = new Account();

			account.google.id = profile.id;
			account.google.token = token;
			account.google.name  = profile.displayName;
			account.google.email = profile.emails && profile.emails[ 0 ].value;

			account.save(function( err ){
				if( err ){
					throw err;
				}

				return done( null, account );
			});
		}

	};

	process.nextTick(function() {
		User.findOne( fields, result );
	});

};
