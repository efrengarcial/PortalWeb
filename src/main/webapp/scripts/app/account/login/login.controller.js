'use strict';

angular.module('portalWebApp')
    .controller('LoginController', function ($rootScope, $scope, $state, $timeout, Auth, usSpinnerService) {
        $scope.user = {};
        $scope.errors = {};

        $scope.startSpin = function() {
            usSpinnerService.spin('spinner-1');
        };

        $scope.stopSpin = function() {
            usSpinnerService.stop('spinner-1');
        };
        
        $scope.isDisabled = false;
        $scope.rememberMe = true;
        $timeout(function (){angular.element('[ng-model="username"]').focus();});
        $scope.login = function (event) {
            event.preventDefault();
            $scope.startSpin();
            $scope.isDisabled = true;
            Auth.login({
                username: $scope.username,
                password: $scope.password,
                rememberMe: $scope.rememberMe
            }).then(function () {
                $scope.authenticationError = false;
                if ($rootScope.previousStateName === 'register') {
                    $state.go('home');
                } else {
                    $rootScope.back();
                }
                $scope.stopSpin();
                $scope.isDisabled = false;
            }).catch(function () {
                $scope.authenticationError = true;
                $scope.stopSpin();
                $scope.isDisabled = false;
            });
        };
    });
