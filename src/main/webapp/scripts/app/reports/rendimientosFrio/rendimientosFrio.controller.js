'use strict';

/**
 * @ngdoc function
 * @name portalWebApp.controller:Reporterendimientosfriocontroller
 * @description
 * # Reporterendimientosfriocontroller
 * Controller of the portalWebApp
 */
angular.module('portalWebApp')
    .controller('ReporteRendimientosFrioController', function($scope, $log) {
        $scope.rendimientosFrio = {
            StartDate: new Date().getTime(),
            EndDate: new Date().getTime(),
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };
        $scope.format = "dd/MM/yyyy";

        //Auxiliars functions
        $scope.open = function($event, fecha) {
            $event.preventDefault();
            $event.stopPropagation();
            if ('openedStartDate' === fecha) {
                $scope.openedStartDate = true;
            } else {
                $scope.openedEndDate = true;
            }
        };

        $scope.clearForm = function() {
            $log.debug("clearForm");
            $scope.rendimientosFrio = {
                StartDate: new Date().getTime(),
                EndDate: new Date().getTime(),
            };

            // Resets the form validation state.
            $scope.rendimientosFrioForm.$setPristine();
        };

        $scope.interacted = function(field) {
            return $scope.submitted || field.$dirty;
        };

        $scope.submitForm = function(isValid) {
            $log.debug("Buscar.......");
        }
    })
