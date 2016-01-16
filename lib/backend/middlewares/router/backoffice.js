var debug = require( 'debug' )( 'templelate:lib:backend:middlewares:router:backoffice' ); debug( 'loaded' );

var express = require( 'express' );
var BackofficeRouter = module.exports = express.Router();

// Initialize backoffice router
BackofficeRouter

// Backoffice landing
.get( '/', function ( req, res, next ){
	next();
});
