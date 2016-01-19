var debug = require( 'debug' )( 'templelate:lib:backend:plugins:crypt' )( 'loaded' );

// Dependencies
var bcrypt = require( 'bcrypt-nodejs' );

// Generate hash for password
exports.generateHash = function( password ){
	return bcrypt.hashSync( password, bcrypt.genSaltSync( 8 ), null );
};

