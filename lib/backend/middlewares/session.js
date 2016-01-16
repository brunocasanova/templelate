var debug = require( 'debug' )( 'templelate:lib:backend:middlewares:session' ); debug( 'loaded' );

// Dependencies
var app = require( './' );
var cookie = require( 'cookie' );
var cookieParser = require( 'cookie-parser' );
var session = module.exports = require( 'express-session' );
var sessionStore = new session.MemoryStore();

// Set cookie sectret
var COOKIE_SECRET = 'secret';
var COOKIE_NAME = 'name';

// Cookie configs
var config = session({
	name: COOKIE_NAME,
	store: sessionStore,
	secret: COOKIE_SECRET,
	saveUninitialized: true,
	resave: true,

	cookie: {
		path: '/',
		expires: new Date( Date.now() + 60 * 100000 ),
		httpOnly: true,
		secure: false,
		maxAge: 60 * 10000,
	},
});

// Pass in to the middleware
app.use( cookieParser( COOKIE_SECRET ) );
app.use( config );
