var debug = require( 'debug' )( 'templelate:lib:backend:core:database:schemas:user' ); debug( 'loaded!' );

// Dependencies
var database = require( '../index' );
var Schema = database.Schema;

// Create Schema
var UserSchema = new Schema({

	id: Number,

    username: String,
    
	password: String,

	created_at: {
		type: Date,
		default: Date.now,
	},

	updated_at: {
		type: Date,
		default: null,
	},

	deleted_at: {
		type: Date,
		default: null,
	},

});

module.exports = database.model( 'User', UserSchema );
