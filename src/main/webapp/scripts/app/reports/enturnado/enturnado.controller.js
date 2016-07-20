'use strict';

/**
 * @ngdoc function
 * @name portalWebApp.controller:Reporteenturnadocontroller
 * @description
 * # Reporteenturnadocontroller
 * Controller of the portalWebApp
 */
angular.module('portalWebApp')
    .controller('ReporteEnturnadoController', ['$scope', '$log', '$filter', 'moment', 'ClientService', '$sce', 'Principal', 'Constants', 'usSpinnerService', 'toaster', '$timeout', function($scope, $log, $filter, moment, ClientService, $sce, Principal, Constants, usSpinnerService, toaster, $timeout) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
            $log.debug("Enturnado controller");
        });
    }]);
