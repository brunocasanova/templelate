var debug = require( 'debug' )( 'templelate:lib:backend:middlewares:router:home' ); debug( 'loaded' );

var express = require( 'express' );
var HomeRouter = module.exports = express.Router();

// Initialize home router
HomeRouter

// Home
.get( '/', function ( req, res, next ){
	next();
})

// Terms
.get( '/terms', function ( req, res, next ){
	req.data.view = 'home/terms.html';

	next();
});
