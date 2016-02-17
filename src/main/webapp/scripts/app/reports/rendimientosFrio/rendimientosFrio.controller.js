'use strict';

/**
 * @ngdoc function
 * @name portalWebApp.controller:Reporterendimientosfriocontroller
 * @description
 * # Reporterendimientosfriocontroller
 * Controller of the portalWebApp
 */
angular.module('portalWebApp')
    .controller('ReporteRendimientosFrioController', ['$scope', '$log', 'moment', 'Constants', function($scope, $log, moment, Constants) {
        
        $scope.rendimientosFrio = {
            StartDate: new Date().getTime(),
              EndDate: new Date().getTime(),
        };

        $scope.toggleMin = function() {
            $scope.minDate = moment(Constants.minDate).format(Constants.formatDate);
            console.log('minDate', $scope.minDate);
        };
        //$scope.toggleMin();
        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };
        $scope.format = Constants.datepickerFormatDate;

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
            var reporteRendimientosFrio = $scope.getReporteInventarioFinalObject();
            $log.debug("Buscar.......");
        };

        $scope.getReporteInventarioFinalObject = function() {
            var report = {
            StartDate: new Date().getTime(),
              EndDate: new Date().getTime(),               

            };

            return report;
        };

        var reporteRendimientosFrio = $scope.getReporteInventarioFinalObject();

    }])
