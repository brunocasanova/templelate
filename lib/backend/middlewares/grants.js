var debug = require( 'debug' )( 'templelate:lib:backend:middlewares:grants' ); debug( 'loaded' );

// Dependencies
var User = require( '../../backend/core/database/schemas/user' );

var isMongoId = function ( string ){
	var testMongoDbId = new RegExp( "^[0-9a-fA-F]{24}$" );

	if( testMongoDbId.test( string ) ) return true;

	return false;
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

// route middleware to ensure user is logged in
exports.isAdmin = function ( req, res, next ){
	if( ! req.logged() ) return res.redirect( '/' );

	var id = (
		req.session.user && isMongoId( req.session.user.id ) &&
		req.session.user.id
	) || false;

	if( ! id ) return res.redirect( '/' );

	User.findOne({ _id: id }, 'perms.admin', function ( err, user ){
		if( err ) throw err;

		if( user.perms.admin ) return next();

		res.redirect( '/' );
	});

};
