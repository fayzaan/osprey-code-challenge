angular.module( 'app.directives' )
	.directive( 'cameraLargestImageCount', [ '$apiCameras', function ( $apiCameras ) {
		var controller = function ( $scope ) {

			$scope.load = function () {
				$apiCameras.getByImageCount( { imagecount: 'largest' } ).then( function ( res ) {
					$scope.camera = res.camera;
				} ).catch( function ( err ) {
					$scope.error = err && err.message ? err.message : 'Failed to load data';
					console.error( 'Dashboard.getCameraWithLargestImageCount.failed', err );
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
			templateUrl: 'views/templates/camera.largest.image.count.html',
			link: function ( scope ) {
				scope.load();
			}
		}
} ] );