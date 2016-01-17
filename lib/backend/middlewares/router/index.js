var debug = require( 'debug' )( 'templelate:lib:backend:middlewares:router' ); debug( 'loaded' );

// Dependencies
var express = require( 'express' );
var Router = module.exports = express.Router();

// Load permissions
var grants = require( '../grants' );

// Load routes
var System = require( './system' );
var Authentication = require( '../authentication' );
var Home = require( './home' );
var Backoffice = require( './backoffice' );

// Initialize Express Router
Router

// Auth routes
.use( '/auth', Authentication )

// Home routes
.use( '/', Home )

// Default routes
.use( '/', /* TODO: see if it is dev envirnoment */ System )

// Backoffice routes
.use( '/backoffice', grants.isAdmin, Backoffice );
