var debug = require( 'debug' )( 'templelate:lib:backend:core:app:server' );

// Dependencies
var app = require( './' );

//Server Configs
var config = {
	PROTOCOL: process.env.PROTOCOL || 'http://',
	HOST: process.env.HOST || 'localhost',
	PORT: process.env.PORT || 8080,
};

config.SERVERURL = [
	config.PROTOCOL,
	config.HOST,
	':',
	config.PORT,
].join( '' );

// Listen server
app.listen( config.PORT, debug( config.SERVERURL ) );
