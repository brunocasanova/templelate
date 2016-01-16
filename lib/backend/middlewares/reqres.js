var debug = require( 'debug' )( 'templelate:lib:backend:middlewares:reqres' ); debug( 'loaded' );

module.exports = function ( req, res, next ){
	// Save in a variable different than the modified
	var r = req;

	// Set url in to an object
	var url = req.originalUrl.split( '/' );

	// Set object url for render middleware
	req.objectUrl = url;

	// Create data field in request
	req.data = {};

	// req accessible in views
	req.data.req = r;

	// Set body as data proto
	req.data.__proto__ = req.body;

	// Set default title
	req.data.title = req.data.title || setDefaultTitle( url );

	// Start view variable
	req.data.view = undefined;

	// Set flash accessible in views
	req.data.flash = req.flash;

	req.logged = function(){
		return !! (
			req.isAuthenticated() &&
			req.session.account &&
			req.session.account.id
		);
	};

	next();
};

function setDefaultTitle ( url ){

	// Set default title
	var title = 'templelate';

	// defaults '/' view
	var root = 'home';

	// Set separator types
	var mainSeparator = ' | ';
	var secSeparator = ' - ';

	// if we have a title add main separator
	if( title ){
		title += mainSeparator;
	}

	// Construct title based on the urls
	for( var i = 1; i < url.length; i++ ) {
		if( ! url[i] ) url[i] = root;

		title +=
			i == 1 && url[i].replace( /^./, url[i][0].toUpperCase() ) ||
			url[i];

		if( i + 1 == url.length ) continue;

		// Set the separator based on length
		title +=
			i > 1 && secSeparator ||
			i < 2 && mainSeparator;
	}

	return title;
}

// Check if mongo db is valid
function checkMongoDbId ( string ){
	var testMongoDbId = new RegExp( "^[0-9a-fA-F]{24}$" );

	// return true if it is a mongo db id
	if( testMongoDbId.test( string ) ){
		return true;
	}

	// If doesn't return false
	return false;
}
