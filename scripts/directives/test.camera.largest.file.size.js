describe( 'Camera with most amount of data used', function () {

	var $compile;
	var $rootScope;
	var scope;
	var $q;
	var mockApiCameras = {};
	var element;
	var mockData = { success: true, camera: { name: 'Camera 1' } };

	beforeEach( module( 'app' ) );
	beforeEach( module( 'app.controllers' ) );
	beforeEach( module( 'app.directives' ) );
	beforeEach( module( 'app.services' ) );
	beforeEach( module( 'app.filters' ) );
	beforeEach( module( 'ngModules' ) );
	beforeEach( module( 'appTemplates' ) );

	beforeEach( function () {
		
		module( function ( $provide ) {
			$provide.value( '$apiCameras', mockApiCameras );
		} );

		inject( function ( _$compile_, _$rootScope_, _$q_ ) {
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$q = _$q_;

			scope = $rootScope.$new();

			mockApiCameras.getByFileSize = function () {
				var deferred = $q.defer();

				deferred.resolve( mockData );

				return deferred.promise;
			};

			element = $compile( angular.element( '<div camera-largest-file-size camera="_file_size_camera"></div>' ) )( scope );

			scope.$digest();
		} );
	} );

	it( 'Should list the name of the camera using the most data', function () {
		expect( element.html() ).toContain( mockData.camera.name + ' Used the most data' );
	} );
	
} );