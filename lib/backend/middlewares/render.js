var debug = require( 'debug' )( 'templelate:lib:backend:middlewares:render' ); debug( 'loaded' );

var fs = require( 'fs' );

module.exports = function ( req, res, next ){
	var viewsDir = __dirname.replace( 'backend/middlewares', 'frontend/views' );

	if( ! req.data.view ){
		req.objectUrl.shift();
		req.objectUrl.map(function ( action ){
			viewsDir += ! action && 'home' || '/' + action;
		});
	}

	req.data.view =
		req.data.view && viewsDir + '/' + req.data.view ||
		getView( viewsDir ) || false;

	if( ! req.data.view ){
		// If file doesn't exist render the 404 error calling next without render
		return next();
	}

	res.render( req.data.view, req.data );
};

function getView ( viewsDir ){
	var render = viewsDir;
	var extension = '.html';

	var checkFile = function ( path ){
		try{
			fs.statSync( path + extension );
		}

		catch( e ){
			return false;
		}

		return true;
	};

	if( ! checkFile( render ) ){
		render += '/index';

		if( ! checkFile( render ) ) return false;
	}

	return render + extension;
}
