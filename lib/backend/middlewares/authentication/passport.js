var debug = require( 'debug' )( 'templelate:lib:backend:middlewares:authentication:passport' )( 'loaded' );

var Passport = module.exports = require( 'passport' );
var LocalStrategy = require( 'passport-local' ).Strategy
var FacebookStrategy = require( 'passport-facebook' ).Strategy
var GoogleStrategy = require( 'passport-google' ).Strategy
var Account = require( './../../core/database/schemas/user' );
var facebookStrategy = require( './strategies/facebook' );
var localStrategy = require( './strategies/local' );
var configs = require( './config' );

// used to serialize the user for the session
Passport.serializeUser(function ( user, done ){
	done( null, user.id );
});

// used to deserialize the user
Passport.deserializeUser(function ( id, done ){
	Account.findById( id, function ( err, user ){
		done( err, user );
	});
});

Passport

// Local register
.use( 'local-register',
	new LocalStrategy({
		username: 'username',
		password: 'password',
		passReqToCallback: true,
	}, localStrategy.register )
)

// Local login
.use( 'local-login',
	new LocalStrategy({
		username: 'username',
		password: 'password',
		passReqToCallback: true,
	}, localStrategy.login )
)

// Facebook
.use( 'facebook',
	new FacebookStrategy({
		clientID: configs.facebookAuth.clientID,
		clientSecret: configs.facebookAuth.clientSecret,
		callbackURL: configs.facebookAuth.callbackURL,
		passReqToCallback: true,
		profileFields: configs.facebookScope,
	}, facebookStrategy )
);

/*
// Google
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
