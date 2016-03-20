'use strict';

/**
 * @ngdoc service
 * @name portalWebApp.APIService
 * @description
 * # APIService
 * Factory in the portalWebApp.
 */
angular
    .module('portalWebApp')
    .factory('APIService', ['Restangular',
        function( Restangular) {
            return Restangular.withConfig(function(RestangularConfigurer) {
                RestangularConfigurer.setBaseUrl('api/');
                RestangularConfigurer.setDefaultHttpFields({
                    timeout: 500000,
                    responseType: 'json'
                });
            });
        }
    ]);