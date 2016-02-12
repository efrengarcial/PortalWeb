'use strict';

/**
 * @ngdoc function
 * @name portalWebApp.controller:Reporteinventariofriocontroller
 * @description
 * # Reporteinventariofriocontroller
 * Controller of the portalWebApp
 */
angular.module('portalWebApp')
    .controller('ReporteInventarioFrioController', ['$scope', '$log', function($scope, $log) {
        $log.debug("Reporte frío");

        $scope.inventarioFrio = {};

        $scope.submitForm = function(isValid) {
            if (isValid) {
                $log.debug(isValid, $scope.inventarioFrio.CuartoFrio);
            }
        };

        $scope.interacted = function(field) {
            return $scope.submitted || field.$dirty;
        };

        $scope.requiredIconMessage = function() {
            $('.required-icon').tooltip({
                tooltipClass: 'customTooltip',
                placement: 'left',
                title: 'Campo requerido'
            });
        };
    }]);
