var debug = require( 'debug' )( 'templelate:lib:backend:middlewares:error' )( 'loaded' );

// Error content
var output4x = [ 404, 'Error 404 Page not found' ];
var output5x = [ 500, 'Error 500 Internal server error' ];

// Error behavior
var setErrorView = function ( code, content ){
	var status = ( code == 500 );

	var req = status && this[ 1 ] || this[ 0 ];
	var res = status && this[ 2 ] || this[ 1 ];
		
	if( status ){
		var err = this[ 0 ];
		req.data.errorMessage = err.stack || err;
	}

	req.data.view = [ 'errors/error', status && '500' || '400', '.html' ];
	req.data.errorTitle = content;

	res.setDefaultHeaders( res, code );

	res.render( req.data.view.join( '' ), req.data );
};

module.exports = [
	
	// Exports 400 error
	function ( req, res, next ) {
		setErrorView.apply( arguments, output4x );
	},

	// Exports 500 error
	function ( err, req, res, next ) {
		setErrorView.apply( arguments, output5x );
	}

];