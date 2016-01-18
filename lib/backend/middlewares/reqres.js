var debug = require( 'debug' )( 'templelate:lib:backend:middlewares:reqres' ); debug( 'loaded' );

module.exports = function ( req, res, next ){
	
	// Modify req to needs
	requify.call( req, {
		url: req.originalUrl.split( '/' ),
	});

	// Modify res to needs
	resify.call( res, { /* options goes here */ });

	// TODO: proxy next method
	//nextify.call( next, { /* options goes here */ });

	next();
};

// Treat req before requests
function requify ( options ){
	// Save in a variable different than the modified
	var self = this;

	// Set object url for render middleware
	self.objectUrl = options.url;

	// Create data field in request
	self.data = {};

	// req accessible in views
	self.data.req = self;

	// Set body as data proto
	self.data.__proto__ = self.body;

	// Set default title
	self.data.title = self.data.title || setDefaultTitle( options.url );

	// Start view variable
	self.data.view = undefined;

	// Set flash accessible in views
	self.data.flash = self.flash;

	// See if it is logged..
	self.logged = function(){
		return !! (
			self.isAuthenticated() &&
			self.session.account &&
			self.session.account.id
		);
	};

}

// Treat res before response
function resify ( options ){

	// default headers in all views
	this.setDefaultHeaders = function( res, code ){
		code = code || 200;

		res.status( code );
		res.setHeader( 'X-Powered-By', 'templelate' );
		res.setHeader( 'Connection', 'keep-alive' );
		res.setHeader( 'Content-Type', 'text/html; charset=utf-8' );
	};

}

// Set default page title
function setDefaultTitle ( url ){
	// Set default title
	var title = 'templelate';

	// defaults '/' view
	var root = 'home';

	// Set separator types
	var mainSeparator = ' | ';
	var secSeparator = ' - ';

	title += mainSeparator;

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
