angular.module( 'app' )
	.config( [ '$routeProvider', function ( $routeProvider ) {
		$routeProvider
			.when( '/', {
				templateUrl: 'views/dashboard.html'
			} )
			.otherwise( {
				redirectTo: '/'
			} )
} ] );