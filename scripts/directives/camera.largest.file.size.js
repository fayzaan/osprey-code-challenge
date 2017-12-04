angular.module( 'app.directives' )
	.directive( 'cameraLargestFileSize', [ '$apiCameras', function ( $apiCameras ) {
		var controller = function ( $scope ) {

			$scope.load = function () {
				$apiCameras.getByFileSize( { filesize: 'largest' } ).then( function ( res ) {
					$scope.camera = res.camera;
				} ).catch( function ( err ) {
					$scope.error = err && err.message ? err.message : 'Failed to retrieve data';
					console.error( 'Dashboard.getCameraWithLargestFileSize.failed', err );
				} );
			}
		};

		return {
			restrict: 'AEC',
			replace: true,
			scope: {
				camera: '='
			},
			controller: controller,
			templateUrl: 'views/templates/camera.largest.file.size.html',
			link: function ( scope ) {
				scope.load();
			}
		}
} ] );