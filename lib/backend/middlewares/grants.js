var debug = require( 'debug' )( 'templelate:lib:backend:middlewares:grants' ); debug( 'loaded' );

// Dependencies
var Account = require( './authentication/account' );

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
		req.session.account && isMongoId( req.session.account.id ) &&
		req.session.account.id
	) || false;

	if( ! id ) return res.redirect( '/' );

	Account.findOne({ _id: id }, 'perms.admin', function ( err, account ){
		if( err ) throw err;

		if( account.perms.admin ) return next();

		return res.redirect( '/' );
	});

};
