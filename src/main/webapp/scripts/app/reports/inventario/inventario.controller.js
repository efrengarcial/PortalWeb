'use strict';

/**
 * @ngdoc function
 * @name portalWebApp.controller:Reporteinventariocontroller
 * @description
 * # Reporteinventariocontroller
 * Controller of the portalWebApp
 */
angular.module('portalWebApp')
    .controller('ReporteInventarioController', ['$scope', '$log', function($scope, $log) {

        $scope.gridOptions = {};

        $scope.Delete = function(row) {
            var index = $scope.gridOptions.data.indexOf(row.entity);
            $scope.gridOptions.data.splice(index, 1);
        };

        var srirachaSauce = 1;
        $scope.sortDataGrid = function(a,b){
            if (a == b) return 0;
            if (a < b) return -1;
            return srirachaSauce;
        };          

        $scope.gridOptions.columnDefs = [{
            name: 'marca',
            field: 'marca'
        }, {
            name: 'reses',
            field: 'reses'
        }, {
            name: 'genero',
            //cellTemplate: '<button class="btn primary" ng-click="grid.appScope.Delete(row)">Delete Me</button>'
            'field': 'genero'
        }, {
            name: 'corral',
            field: 'corral'
        }, {
            name: 'loteId',
            field: 'loteId'
        }, {
            name: 'ciudad',
            field: 'ciudad'
        }, {
            name: 'departamento',
            field: 'departamento'
        }, {
            name: 'guia',
            field: 'guia'
        }, {
            name: 'fecha',
            field: 'fecha'
        }];

        $scope.dataGrid = [{
            "marca": 23,
            "reses": 4,
            "genero": "M",
            "corral": 216,
            "loteId": 172490,
            "ciudad": "AGUAZUL",
            "departamento": "CASANARE",
            "guia": 0289351,
            "fecha": "10/21/2015 9:39:58"
        }, {
            "marca": 2,
            "reses": 5,
            "genero": "M",
            "corral": 249,
            "loteId": 172451,
            "ciudad": "VILLAVICENCIO",
            "departamento": "META",
            "guia": 06339798,
            "fecha": "10/21/2015 6:26:58"
        }];

        $scope.gridOptions = {
            data: 'dataGrid',
            sortInfo: $scope.sortDataGrid
        };      

    }]);
