
// Verify mongo ids
exports.isMongoId = function( id ){
	var testMongoDbId = new RegExp( "^[0-9a-fA-F]{24}$" );

	// return true if it is a mongo db id
	if( testMongoDbId.test( id ) ) return true;

	// If doesn't return false
	return false;
};