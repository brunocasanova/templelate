var debug = require( 'debug' )( 'templelate:lib:backend:middlewares:statics' ); debug( 'loaded' );

// Dependencies
var EJS = require( 'ejs' );
var express = require( 'express' );
var app = require( './' );
var favicon = require( 'serve-favicon' );
var expressLayouts = require( 'express-ejs-layouts' );

// Define paths
var frontend = __dirname.replace( 'backend/middlewares', 'frontend/' );
var viewsPath = frontend + 'views/';

// Favicon
app.use( favicon( frontend + 'src/img/icons/favicon_templelate.ico' ) );

// Views engine
app.engine( '.html', EJS.__express );
app.set( 'view engine', 'ejs' );
app.set( 'views', viewsPath );

// Layout engine
app.set( 'layout', viewsPath + 'layouts/index.html' );
app.use( expressLayouts );

// Serve statics
app.use( '/semantic', express.static( frontend + 'semantic-ui' ) );
app.use( '/frontend', express.static( frontend ) );

// Serve templates
app.use( '/template', express.static( frontend + 'templates' ) );
