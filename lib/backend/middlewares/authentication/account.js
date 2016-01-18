var debug = require( 'debug' )( 'templelate:lib:backend:middlewares:authentication:account' )( 'loaded' );

// Dependencies
var database = require( '../../core/database' );
var Schema = database.Schema;

// Encrypt password
var bcrypt = require( 'bcrypt-nodejs' );

var AccountSchema = new Schema({

	// Account permissions
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
			
			get: function (){
				var fname = this.local.first_name || this.facebook.first_name;
				var lname = this.local.last_name || this.facebook.last_name || '';

				return fname + ' ' + lname;
			},
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

// Generate hash for password
AccountSchema.methods.generateHash = function( password ){
	return bcrypt.hashSync( password, bcrypt.genSaltSync( 8 ), null );
};

// See if the password is valid
AccountSchema.methods.validPassword = function( password ) {
	return bcrypt.compareSync( password, this.local.password );
};

// Authenticate session after logged
AccountSchema.methods.authenticate = function( account, req, done, flash ){
	req.account = req.session.account = {

		// Id in to session
		id:
			account._id ||
			account.facebook && account.facebook.id,

		// Username in to session
		username:
			account.local && account.local.username ||
			account.facebook && account.facebook.first_name,
	};

	return done( null, account, flash && req.flash( 'message', flash ) || '' );

};

// TODO: method should be available in all models
AccountSchema.methods.checkMongoDbId = function( id ){
	var testMongoDbId = new RegExp( "^[0-9a-fA-F]{24}$" );

	// return true if it is a mongo db id
	if( testMongoDbId.test( id ) ) return true;

	// If doesn't return false
	return false;
};

// Export Schema
module.exports = database.model( 'Account', AccountSchema );
