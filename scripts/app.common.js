angular.module( 'config', [] ).value( { 'version': '1.0.0' } );

angular.module( 'app.controllers', [ 'config' ] );
angular.module( 'app.directives', [ 'config' ] );
angular.module( 'app.services', [ 'config' ] );
angular.module( 'app.filters', [ 'config' ] );

angular.module( 'ngModules', [ 'ngRoute' ] );

var app = angular.module( 'app', [ 'ngModules', 'app.controllers', 'app.directives', 'app.services', 'app.filters' ] );