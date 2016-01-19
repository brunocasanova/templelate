var debug = require( 'debug' )( 'templelate:lib:backend:middlewares:authentication:passport' )( 'loaded' );

// Dependencies
var Passport = module.exports = require( 'passport' );
var User = require( './../../core/database/schemas/user' );

// Local auth
var passportLocal = require( 'passport-local' ).Strategy
var localStrategy = require( './strategies/local' );

// Social auths
var passportFacebook = require( 'passport-facebook' ).Strategy
var facebookStrategy = require( './strategies/facebook' );
// TODO
//var passportGoogle = require( 'passport-google' ).Strategy

// Load facebook and google configs
var configs = require( './config' );

// used to serialize the user for the session
Passport.serializeUser(function ( user, done ){
	done( null, user.id );
});

// used to deserialize the user
Passport.deserializeUser(function ( id, done ){
	User.findById( id, function ( err, user ){
		done( err, user );
	});
});

Passport

// Local register
.use( 'local-register',

	new passportLocal({
		username: 'username',
		password: 'password',
		passReqToCallback: true,
	}, localStrategy.register )

)

// Local login
.use( 'local-login',
	new passportLocal({
		username: 'username',
		password: 'password',
		passReqToCallback: true,
	}, localStrategy.login )
)

// Facebook
.use( 'facebook',
	new passportFacebook({
		clientID: configs.facebookAuth.clientID,
		clientSecret: configs.facebookAuth.clientSecret,
		callbackURL: configs.facebookAuth.callbackURL,
		passReqToCallback: true,
		profileFields: configs.facebookScope,
	}, facebookStrategy )
);

/*
// TODO: Social google
Passport.use( 'google',
	new GoogleStrategy({
		clientID: configs.googleAuth.clientID,
		clientSecret: configs.googleAuth.clientSecret,
		callbackURL: configs.googleAuth.callbackURL,
		passReqToCallback: true,
	},
	require( './public/google' ) )
);
*/
