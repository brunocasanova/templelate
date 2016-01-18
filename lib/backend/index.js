var debug = require( 'debug' )( 'templelate:lib:backend' ); debug( 'loaded' );

// TODO: Set global only for development
global.exitLog = function ( message, text ){

	if( ! message ){
		console.log( new Date() + ' :::templelate default log:::' );
	}

	else{

		if( text ){
			console.log( message, text );
		}

		else{
			console.log( message );
		}
	}

	process.exit( 0 );
};

module.exports = require( './core' );
