
// FORM
$( '.ui.form.login' )
.form({
	fields: {

		username: {
			identifier: 'username',

			rules: [{
				type: 'empty',
				promp: 'Please enter a username'
			}]
		},

		password: {
			identifier: 'password',
			rules: [{
				type: 'empty',
				prompt: 'Please enter a password'
			},
			{
				type: 'minLength[4]',
				prompt: 'Your password must be at least {ruleValue} characters'
			}]
		},

	}
})
.submit(function ( event ){
	if( event.target.className.indexOf( 'error' ) === -1 ){
		$( this ).addClass( 'loading' );
	}
});

$( '.ui.form.register' )
.form({
	fields: {

		first_name: {
			identifier: 'first_name',

			rules: [{
				type: 'empty',
				promp: 'Please enter your first name'
			}]
		},

		last_name: {
			identifier: 'last_name',
		},

		password: {
			identifier: 'password',
			rules: [{
				type: 'empty',
				prompt: 'Please enter a password'
			},
			{
				type: 'minLength[4]',
				prompt: 'Your password must be at least {ruleValue} characters'
			}]
		},

		email: {
			identifier: 'email',

			rules: [{
				type: 'email',
				prompt : 'Please enter a valid e-mail'
			}],
		},

		gender: {
			identifier: 'gender',

			rules: [{
				type: 'empty',
				prompt : 'Please enter a valid gender'
			}],
		},

		terms: {
			identifier: 'terms',
			rules: [{
				type: 'checked',
				prompt: 'You must agree to the terms and conditions'
			}]
		}

	}
})
.submit(function ( event ){
	if( event.target.className.indexOf( 'error' ) === -1 ){
		$( this ).addClass( 'loading' );
	}
});

$( '.ui.checkbox' ).checkbox();

// API

$.fn.api.settings.api = {
	'autoload': '/templates/data',
	'facebook': '/auth/facebook',
};

// Facebook button loading animation
$( '.facebook' )
.click(function (){
	$( this ).addClass( 'loading' );
});

$( '.sidebar-trigger' )
.click(function (){
	$( '.ui.labeled.icon.sidebar' ).sidebar( 'toggle' );
});

// Dropdown animation for gender form
$( 'select.dropdown.gender' ) .dropdown();

// Templating
$.fn.api.settings.api.autoload = '/templates/data';
/*
$autoload.visibility({

	onPassing: function ( o ){
		var div = '<div style="height: 900px; background-color: #999;" class="ui segment"></div>';

		//$( this ).removeClass( 'loading' );
		$( $wrap ).append( div );

		$autoload.load( '/template/data.html' );

		//$( this ).removeClass( 'loading' );

		//	$( this ).load( '/template/data.html' );
		//});
	},

});
*/
//var $autoload = $( '.autoload' );
//$autoload.addClass( 'loading' );
