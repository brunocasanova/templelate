var debug = require( 'debug' )( 'templelate:lib:backend:middlewares:grants' ); debug( 'loaded' );

// Dependencies
var User = require( '../../backend/core/database/schemas/user' );
var util = require( '../plugins/util' );
var store = require( '../plugins/store' );

// route middleware to ensure user is logged in
exports.isAdmin = function ( req, res, next ){
	if( ! req.logged() ) return res.redirect( '/' );

	var id = (
		req.session.user && util.isMongoId( req.session.user.id ) &&
		req.session.user.id
	) || false;

	if( ! id || store.cachedAdmins.indexOf( id ) === -1 ){
		return res.redirect( '/' );
	}

	next();
};

// route middleware to ensure user is logged in
exports.isClient = function ( req, res, next ){
	if( req.logged() ) return next();

	// you are not even logged out, wtf
	res.redirect( '/' );
};

// route middleware to ensure user is logged in
exports.isLogged = function ( req, res, next ){
	if( req.logged() ) return next();

	// you are not even logged out, wtf
	res.redirect( '/' );
};

// route middleware to ensure user is logged in
exports.isntLogged = function ( req, res, next ){
	if( ! req.logged() ) return next();

	res.redirect( '/' );
};