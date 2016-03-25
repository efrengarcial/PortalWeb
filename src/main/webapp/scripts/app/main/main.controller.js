'use strict';

angular.module('portalWebApp')
    .controller('MainController', function($scope, Principal) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;

            // Here I synchronize the value of label and percentage in order to have a nice demo
            $scope.$watch('roundProgressData', function(newValue, oldValue) {
                newValue.percentage = newValue.label / 100;
            }, true);

            $scope.guiasBovinos = function() {
                $scope.roundProgressData = {
                    label: 25,
                    percentage: 0.25,
                    tipoGanado: "Bovinos"
                };
            };

            $scope.guiasPorcinos = function() {
                $scope.roundProgressData = {
                    label: 18,
                    percentage: 0.18,
                    tipoGanado: "Porcinos"
                };
            };

            $scope.guiasBovinos();
        });
    });
