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

        $scope.inventarioFrio = {
            CuartoFrio: 123456
        };

        $scope.clearForm = function() {

            $scope.inventarioFrio = {};
            
            // Resets the form validation state.
            $scope.inventarioFrioForm.$setPristine();
            // Broadcast the event to also clear the grid selection.
            //$rootScope.$broadcast('clear');
        };

        $scope.submitForm = function(isValid) {
            if (isValid) {
                $log.debug(isValid, $scope.inventarioFrio.CuartoFrio);
                $scope.clearForm();
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
