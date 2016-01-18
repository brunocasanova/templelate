var debug = require( 'debug' )( 'templelate:lib:backend:middlewares:router' ); debug( 'loaded' );

// Dependencies
var express = require( 'express' );
var Router = module.exports = express.Router();

// Load permissions
var grants = require( '../grants' );

// Load routes
var DebugRoutes = require( './debug' );
var AuthRoutes = require( '../authentication' );
var HomeRoutes = require( './home' );
var BackofficeRoutes = require( './backoffice' );

// Initialize Express Router
Router

// Auth routes
.use( '/auth', AuthRoutes )

// Home routes
.use( '/', HomeRoutes, /* TODO: see if it is dev envirnoment */ DebugRoutes )

// Backoffice routes
.use( '/backoffice', grants.isAdmin, BackofficeRoutes );
