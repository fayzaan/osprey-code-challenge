angular.module( 'app.directives' )
	.directive( 'cameraTable', [ '$apiCameras', function ( $apiCameras ) {
	var controller = function ( $scope ) {
		$scope.cameras = {};
		$scope.cameraIds = [];
		$scope.load = {};
		$scope.errors = {};

		$scope.load = function () {
			$apiCameras.getIds().then( function ( res ) {
				$scope.cameraIds = res.list;

				$scope.getCameras( $scope.cameraIds );
			} ).catch( function ( err ) {
				console.error( 'failed to get cameras', err );
			} );
		};

		$scope.getCameras = function ( ids ) {
			if ( !ids ) { ids = []; }
			
			ids.forEach( function ( id ) {
				$scope.load[ id ] = true;
				$apiCameras.get( { id: id } ).then( function ( res ) {
					if ( res.camera ) {
						$scope.cameras[ id ] = res.camera;
					} else {
						$scope.errors[ id ] = res.error && res.error.message ? ( res.error.message ) : 'Failed to load camera';
					}
				} ).catch( function ( res ) {
					$scope.errors[ id ] = res.error && res.error.message ? ( res.error.message ) : 'Failed to load camera';
				} ).finally( function () {
					$scope.load[ id ] = false;
				} );
			} );
		};

		$scope.countData = function ( images ) {
			var data = 0;

			images.forEach( function ( img ) {
				data += ( img.file_size || 0 );
			} );

			return data;
		};

		$scope.getImageBySize = function ( images ) {
			var size = 0;

			images.forEach( function ( img ) {
				size = img.file_size > size ? img.file_size : size;
			} );

			return size;
		};
	};

	return {
		restrict: 'AEC',
		controller: controller,
		templateUrl: 'views/templates/camera.table.html',
		scope: {},
		link: function ( scope ) {
			console.log( 'camera.table.link', scope );
			scope.load();
		}
	};
} ] );