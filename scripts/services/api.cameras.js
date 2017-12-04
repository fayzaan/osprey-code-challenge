angular.module( 'app.services' )
	.factory( '$apiCameras', [ '$http', '$q', function ( $http, $q ) {
		var $scope = {};

		var cameraIds = [ 1, 2, 3, 4, 5, 6, 7 ]; // id 7 to mock error

		var cameras = [
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

		function findById ( id ) {
			return cameras.filter( function ( camera ) { return camera.camera_id === id } )[ 0 ];
		}

		$scope.getIds = function () {
			var deferred = $q.defer();

			setTimeout( function () {
				deferred.resolve( { success: true, list: angular.copy( cameraIds ) } );
			}, 1 );

			return deferred.promise;
		};

		function findLargestImageSize ( images, smallest ) {
			return images.reduce( function ( a, b ) {
				if ( smallest ) {
					return ( a.file_size < b.file_size ) ? a : b;
				} else {
					return ( a.file_size > b.file_size ) ? a : b;
				}
			} );
		}

		function getTotalDataCount ( images ) {
			return images.reduce( function ( total, b ) {
				total += b.file_size;//( a.file_size || 0 ) + ( b.file_size || 0 );
			}, 0 );
		}

		function findByFileSize ( param ) {
			switch ( param ) {
				case 'largest':
					var size = 0;
					var res = cameras.reduce( function ( a, b ) {
						return ( getTotalDataCount( a.images ) > getTotalDataCount( b.images ) ) ? a : b;
					} );

					console.log( 'findByFileSize', res );

					return res;
				case 'smallest':
					return cameras.reduce( function ( a, b ) {
						return ( getTotalDataCount( a.images ) < getTotalDataCount( b.images ) ) ? a : b;
					} );
			}
		}

		function findByImageCount ( param ) {
			switch ( param ) {
				case 'largest':
					var size = 0;
					return cameras.reduce( function ( a, b ) {
						return ( a.images.length > b.images.length ) ? a : b;
					} );
				case 'smallest':
					return cameras.reduce( function ( a, b ) {
						return ( a.images.length < b.images.length ) ? a : b;
					} );
			}
		}

		$scope.getByFileSize = function ( params ) {
			var deferred = $q.defer();

			setTimeout( function () {
				if ( params && params.filesize ) {
					if ( [ 'largest', 'smallest' ].indexOf( params.filesize ) !== -1 ) {
						var camera = findByFileSize( params.filesize );

						if ( camera ) {
							deferred.resolve( { success: true, camera: camera } );
						} else {
							deferred.reject( { success: false, error: { message: 'Failed to find camera by size' } } );
						}
					} else {
						deferred.reject( { success: false, error: { message: 'Failed to find camera by file size, invalid parameter' } } );
					}
				} else {
					deferred.reject( { success: false, error: { message: 'Failed to find camera by file size, invalid parameter' } } );
				}
			}, 0 );

			return deferred.promise;
		};

		$scope.getByImageCount = function ( params ) {
			var deferred = $q.defer();

			setTimeout( function () {
				if ( params && params.imagecount && [ 'largest', 'smallest' ].indexOf( params.imagecount ) !== -1 ) {
					var camera = findByImageCount( params.imagecount );

					console.log( 'getByImageCount.res', camera );

					if ( camera ) {
						deferred.resolve( { success: true, camera: camera } );
					} else {
						deferred.reject( { success: false, error: { message: 'Failed to find camera by image count' } } );
					}
				} else {
					deferred.reject( { success: false, error: { message: 'Failed to find camera by image count, invalid parameter' } } );
				}
			}, 0 );

			return deferred.promise;
		};

		$scope.get = function ( params ) {
			console.log( 'api.cameras.get', cameras );
			var deferred = $q.defer();
			var _timeout_timer = 1;

			if ( params && params.id && params.id === 3 ) {
				_timeout_timer = 3000; // mock slow load
			}

			if ( !params ) { params = {}; }

			setTimeout( function () {
				if ( params.id ) {
					var _camera = findById( params.id );
					
					if ( _camera ) {
						deferred.resolve( { success: true, camera: _camera } );
					} else {
						deferred.reject( { success: false, error: { message: 'Failed to find camera by id, ' + params.id } } );
					}
				} else {
					deferred.resolve( { success: true, cameras: angular.copy( cameras ) } );
				}
			}, _timeout_timer );

			return deferred.promise;
		};

		return $scope;
} ] );