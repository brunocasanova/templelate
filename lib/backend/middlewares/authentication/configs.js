module.exports = {

	facebookAuth : {
		clientID: '914284601958200',
		clientSecret: 'd42550c0abe6f447349052a9ae6abcfc',
		callbackURL: 'http://localhost:8080/auth/facebook/callback'
	},

	facebookScope: [ 'id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified' ],

	googleAuth : {
		clientID: 'your-secret-clientID-here',
		clientSecret: 'your-client-secret-here',
		callbackURL: 'http://localhost:8080/auth/google/callback'
	}

};

