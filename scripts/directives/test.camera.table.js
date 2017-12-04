describe( 'Camera List', function () {

	var $compile;
	var $rootScope;
	var scope;
	var $q;
	var mockApiCameras = {};
	var element;
	var mockIdsList = { success: true, list: [ 1, 2, 3 ] };
	var mockCameraList = [
			{
				camera_id: 1,
				name: 'Camera 1',
				images: [
					{
						file_size: 42048
					},
					{
						file_size: 1024
					},
					{
						file_size: 12333
					}
				]
			},
			{
				camera_id: 2,
				name: 'Camera 2',
				images: [
					{
						file_size: 12048
					},
					{
						file_size: 1024
					},
					{
						file_size: 12333
					}
				]
			},
			{
				camera_id: 3,
				name: 'Camera 3',
				images: [
					{
						file_size: 52048
					},
					{
						file_size: 1024
					},
					{
						file_size: 12333
					}
				]
			}
		];

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

			mockApiCameras.getIds = function () {
				var deferred = $q.defer();

				deferred.resolve( mockIdsList );

				return deferred.promise;
			};

			mockApiCameras.get = function ( params ) {
				var deferred = $q.defer();

				var _camera = mockCameraList.filter( function ( cam ) { return cam.camera_id === params.id } )[ 0 ];

				deferred.resolve( { success: true, camera: _camera } );

				return deferred.promise;
			}

			element = $compile( angular.element( '<div camera-table cameras="_cameras"></div>' ) )( scope );

			scope.$digest();
		} );
	} );

	it( 'Should list all the cameras returned from data', function () {
		// expect( true ).toEqual( true );
		mockCameraList.forEach( function ( cam ) {
			expect( element.html() ).toContain( cam.name );
		} );
		// expect( element.html() ).toContain( mockData.camera.name + ' Has the most images with ' + mockData.camera.images.length + ' images' );
	} );
	
} );