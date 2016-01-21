var debug = require( 'debug' )( 'templelate:lib:backend:plugins:store' ); debug( 'loaded' );

var User = require( '../../backend/core/database/schemas/user' );

var cachedAdmins = [];

User.find({ 'perms.admin': true }, function ( err, admins ){
	if( err ) throw err;

	admins.forEach(function ( admin ){
		cachedAdmins.push( admin.id );
	});

});

exports.cachedAdmins = cachedAdmins;
