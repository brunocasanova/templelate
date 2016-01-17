var debug = require( 'debug' )( 'templelate:lib:backend:middlewares:authentication:router' ); debug( 'loaded' );

// dependencies
var passport = require( './passport' );
var express = require( 'express' );
var AuthenticationRouter = module.exports = express.Router();
var grants = require( '../grants' );
var configs = require( './config' );

// Initialize local router
AuthenticationRouter

// Local login routes
.all( '/login', grants.isntLogged )
.get( '/login', function ( req, res, next ){
	next();
})
.post( '/login', passport.authenticate( 'local-login', {
	successRedirect: '/home',
	failureRedirect: '/auth/login',
	failureFlash: true,
}))

// Logout routes
.all( '/logout', grants.isLogged )
.get( '/logout', function ( req, res, next ){
	req.logout();
	req.session.destroy();
	res.redirect( '/' );
})

// Register routes
//.all( '/register', grants.isntLogged )
.get( '/register', function ( req, res, next ){
	next();
})
.post( '/register', passport.authenticate( 'local-register', {
	successRedirect: '/home',
	failureRedirect: '/auth/login',
	failureFlash: true,
}))

// TODO: unlink local
.get( '/unlink/local', function ( req, res ) {
	var user = req.user;

	user.local.first_name = undefined;
	user.local.password = undefined;

	user.save(function ( err ){
		res.redirect( '/home' );
	});
});

// facebook -------------------------------

// Initialize public router
AuthenticationRouter

// Facebook login
.get( '/facebook', passport.authenticate( 'facebook', { scope: [ 'email', 'public_profile' ] } ) )
.get( '/facebook/callback', passport.authenticate( 'facebook', {
	successRedirect : '/backoffice',
	failureRedirect : '/home',
}))

// TODO: unlink facebook
.get( '/unlink/facebook', function ( req, res ){
	var user = req.user;
	user.facebook.token = undefined;
	user.save(function ( err ){
		res.redirect( '/home' );
	});
});

/*
// Google login
.get( '/google', passport.authenticate( 'google', { scope : [ 'profile', 'email' ] } ))
.get( '/google/callback', passport.authenticate( 'google', {
	successRedirect : '/backoffice',
	failureRedirect : '/home'
}));
*/
