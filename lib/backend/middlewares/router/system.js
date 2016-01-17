var debug = require( 'debug' )( 'templelate:lib:backend:middlewares:router:default' ); debug( 'loaded' );

var express = require( 'express' );
var System = module.exports = express.Router();

// Initialize home router
System

// Debug view
.get( '/debug', function ( req, res, next ){
	res.redirect( req.protocol + '://' + req.hostname + ':' + 8083 + '/debug?port=5858' );
})

// Database view
.get( '/mongodb', function ( req, res, next ){
	res.redirect( req.protocol + '://' + req.hostname + ':' + 8082 + '/db/templelate' );
})

// Ping server
.get( '/ping', function ( req, res ){
	res.set( 'Content-Type', 'text/plain' ).status( 200 ).send( 'pong!' );
});
