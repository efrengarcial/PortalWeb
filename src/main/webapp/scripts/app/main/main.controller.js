'use strict';

angular.module('portalWebApp')
    .controller('MainController', function($scope, Principal) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;

            $scope.roundProgressData = {
                label: 0,
                percentage: 0
            };

            // Here I synchronize the value of label and percentage in order to have a nice demo
            $scope.$watch('roundProgressData', function(newValue, oldValue) {
                newValue.percentage = newValue.label / 100;
            }, true);

            $scope.guiasBovinos = function() {
                $scope.roundProgressData = {
                    label: 9,
                    percentage: 0.9
                };
            };

            $scope.guiasPorcinos = function() {
                $scope.roundProgressData = {
                    label: 3,
                    percentage: 0.3
                };
            };
        });
    });
