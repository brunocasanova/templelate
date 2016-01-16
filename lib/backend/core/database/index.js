var debug = require( 'debug' )( 'templelate:lib:backend:core:database' ); debug( 'loaded' );

var mongoose = module.exports = require( 'mongoose' );
var database = mongoose.connection;
var config = require( './config' );

var uri = 'mongodb://localhost:27017/templelate';

mongoose.connect( uri, config.mongodb );

database.on( 'error', function ( err ){ debug( err ); });
database.once( 'open', function (){ debug( uri ); });
