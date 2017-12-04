describe( 'Camera with largest image count', function () {

	var $compile;
	var $rootScope;
	var scope;
	var $q;
	var mockApiCameras = {};
	var element;
	var mockData = { success: true, camera: { name: 'Camera 1', images: [ { file_size: 1233 }, { file_size: 45634 }, { file_size: 4346 } ] } };

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

			mockApiCameras.getByImageCount = function () {
				var deferred = $q.defer();

				deferred.resolve( mockData );

				return deferred.promise;
			};

			element = $compile( angular.element( '<div camera-largest-image-count camera="_camera"></div>' ) )( scope );

			scope.$digest();
		} );
	} );

	it( 'should show the name and image count for the Camera with greatest number of images', function () {
		expect( element.html() ).toContain( mockData.camera.name + ' Has the most images with ' + mockData.camera.images.length + ' images' );
	} );
	
} );