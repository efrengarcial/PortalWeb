'use strict';

/**
 * @ngdoc function
 * @name portalWebApp.controller:Reportetrazabilidadcontroller
 * @description
 * # Reportetrazabilidadcontroller
 * Controller of the portalWebApp
 */
angular.module('portalWebApp')
    .controller('ReporteTrazabilidadController', function($scope, $log) {
        $scope.reporte = {
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
            $scope.reporte = reporte = {
                StartDate: new Date().getTime(),
                EndDate: new Date().getTime(),
            };

            // Resets the form validation state.
            $scope.reporteInventarioFinalForm.$setPristine();
        };

        $scope.interacted = function(field) {
            return $scope.submitted || field.$dirty;
        };

        $scope.submitForm = function(isValid) {
            $log.debug("Buscar.......");
        }



        $scope.gridOptions = {
            columnDefs: [{
                field: 'loteId',
                displayName: 'Lote Id'
            }, 
            {
                field: 'fechaLlegada',
                displayName: 'Fecha Llegada'
            }, 
            {
                name: 'porteria',
                displayName: 'Porteria',
                cellTemplate: '<button id="editBtn" type="button" class="btn-small" ng-click="edit(row.entity)" >Edit</button> '
            }]
        };

    })