var debug = require( 'debug' )( 'templelate:lib:backend:middlewares:authentication:user' )( 'loaded' );

// Dependencies
var database = require( '../' );
var Schema = database.Schema;

// Encrypt password
var bcrypt = require( 'bcrypt-nodejs' );

var UserSchema = new Schema({

	// User permissions
	perms: {

		admin: {
			type: Boolean,
			default: false,
		},

		client: {
			type: Boolean,
			default: false,
		},

		visitor: {
			type: Boolean,
			default: true,
		},

	},

	// Local information
	local: {

		id: {
			type: String,
		},
		
		username: {
			type: String,
			trim: true,
		},

		first_name: {
			type: String,
			trim: true,
		},

		last_name: {
			type: String,
			trim: true,
		},

		password: {
			type: String,
			//get: function (){
				//return '********';
			//},
		},

		email: {
			type: String,
			trim: true,
			lowercase: true,
		},

		gender: {
			type: String,
			match: /^(?!^(?:M|F)$).*$/,
			trim: true,
			set: function ( g ){
				if( g != 'male' && g != 'female' ){
					return false;
				}

				return true;
			},
		},

	},

	// Facebook information
	facebook : {

		id: String,

		username: String,

		first_name: String,

		last_name: String,

		email: String,

		gender: String,

		link: String,

		locale: String,

		timezone: String,

		updated_time: Date,

		token: String,

		verified: {
			type: Boolean,
			default: false,
		},
	},

});

// See if the password is valid
UserSchema.methods.validPassword = function( password ) {
	return bcrypt.compareSync( password, this.local.password );
};

// Authenticate session after logged
UserSchema.methods.sessionAuthenticate = function( user, req, done, flash ){
	req.user = req.session.user = {

		// Id in to session
		id:
			user._id ||
			user.facebook && user.facebook.id,

		// Username in to session
		username:
			user.local && user.local.username ||
			user.facebook && user.facebook.first_name,
	};

	return done( null, user, flash && req.flash( 'message', flash ) || '' );

};

// Export Schema
module.exports = database.model( 'User', UserSchema );
