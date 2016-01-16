var debug = require( 'debug' )( 'templelate:lib:backend:middlewares' )( 'loaded' );

// Proxy app from core
var app = module.exports = require( '../core/app' );

// Initilize middlewares
var bodyParser = require( 'body-parser' );
var session = require( './session' );
var reqres = require( './reqres' );

// Alerts
var flash = require( 'connect-flash' );

// Authentication
var authentication = require( './authentication' );
var passport = require( './authentication/passport' );

// Load routes
var router = require( './router' );

// Load render
var render = require( './render' );

// Load statics
var statics = require( './statics' );

// Load error
var error = require( './error' );

// Body parser
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

// Flash messages
app.use( flash() );

//Pre render
app.use( reqres );

// authentication
app.use( passport.initialize() );
app.use( passport.session() );

// Router
app.use( router );

//Post render
app.use( render );

// Errors
app.use( error );
