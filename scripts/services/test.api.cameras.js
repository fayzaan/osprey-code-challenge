describe( 'Cameras API service', function () {

	var $compile;
	var $rootScope;
	var scope;
	var $q;
	var element;

	var mockApiService;
	var mockIdsList = [ 1, 2, 3, 4, 5, 6, 7 ];
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
			},
			{
				camera_id: 4,
				name: 'Camera 4',
				images: [
					{
						file_size: 14048
					},
					{
						file_size: 12024
					},
					{
						file_size: 12333
					},
					{
						file_size: 12024
					},
					{
						file_size: 1224
					}
				]
			},
			{
				camera_id: 5,
				name: 'Camera 5',
				images: [
					{
						file_size: 22048
					},
					{
						file_size: 1024
					},
					{
						file_size: 1433
					},
					{
						file_size: 1333
					},
					{
						file_size: 12322
					}
				]
			},
			{
				camera_id: 6,
				name: 'Camera 6',
				images: [
					{
						file_size: 80232
					},
					{
						file_size: 10224
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

		inject( function ( _$rootScope_, _$apiCameras_, _$q_ ) {
			scope = _$rootScope_.$new();
			mockApiService = _$apiCameras_;
			$q = _$q_;
		} );
	} );

	it( 'Should list all the cameras returned from data', function () {
		mockApiService.get().then( function ( res ) {
			expect( res.cameras ).toEqual( mockCameraList );
		} );

		scope.$digest();
	} );

	it( 'Should return ids of all cameras', function () {
		mockApiService.getIds().then( function ( res ) {
			expect( res.list ).toEqual( mockIdsList );
		} );

		scope.$digest();
	} );

	it( 'Should return camera with the most data used', function () {
		mockApiService.getByFileSize().then( function ( res ) {
			expect( res.camera.name ).toEqual( mockCameraList[ 5 ].name );
		} );

		scope.$digest();
	} );

	it( 'Should return camera with the most number of images', function () {
		mockApiService.getByFileSize().then( function ( res ) {
			expect( res.camera.name ).toEqual( mockCameraList[ 4 ].name );
		} );

		scope.$digest();
	} );
} );