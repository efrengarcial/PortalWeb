'use strict';

angular.module('portalWebApp')
    .controller('MainController', ['$scope', '$log', 'Principal', '$compile', 'Constants', function($scope, $log, Principal, $compile, Constants) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;

            function initProductsData() {
                $scope.ganado = {
                    bovinos: {
                        guiasAFavor: 0,
                        showRoundData: false,
                        marca: 0,
                        producto: "Bovinos"
                    },
                    porcinos: {
                        guiasAFavor: 0,
                        showRoundData: false,
                        marca: 0,
                        producto: "Porcinos"
                    }
                }
            }

            initProductsData();

            function getProductos() {
                if ($scope.account) {
                    if ($scope.account.client) {
                        if ($scope.account.client.productos) {
                            $scope.productos = $scope.account.client.productos;
                            for (var producto in $scope.productos) {
                                var tipoProducto = $scope.productos[producto].tipoProducto;

                                if (tipoProducto == Constants.B) {
                                    $scope.ganado.bovinos.showRoundData = true;
                                    $scope.ganado.bovinos.guiasAFavor = $scope.productos[producto].guiasAFavor;
                                    $scope.ganado.bovinos.marca = $scope.productos[producto].marca;
                                }

                                if (tipoProducto == Constants.P) {
                                    $scope.ganado.porcinos.showRoundData = true;
                                    $scope.ganado.porcinos.guiasAFavor = $scope.productos[producto].guiasAFavor;
                                    $scope.ganado.porcinos.marca = $scope.productos[producto].marca;
                                }
                            }
                        }
                    }
                }
            }
            getProductos();

            // Here I synchronize the value of label and percentage in order to have a nice demo
            $scope.$watch('roundProgressBovinos', function(newValue, oldValue) {
                if (!newValue) {
                    newValue = $scope.roundProgressBovinos = {
                        label: 0,
                        percentage: 0
                    };
                }
                newValue.percentage = newValue.label / 1000;
            }, true);

            $scope.$watch('roundProgressPorcinos', function(newValue, oldValue) {
                if (!newValue) {
                    newValue = $scope.roundProgressPorcinos = {
                        label: 0,
                        percentage: 0
                    };
                }
                newValue.percentage = newValue.label / 1000;
            }, true);

            $scope.setRoundsProgressData = function() {
                $scope.roundProgressBovinos = {
                    label: $scope.ganado.bovinos.guiasAFavor,
                    producto: $scope.ganado.bovinos.producto,
                    marca: $scope.ganado.bovinos.marca
                };

                $scope.roundProgressPorcinos = {
                    label: $scope.ganado.porcinos.guiasAFavor,
                    producto: $scope.ganado.porcinos.producto,
                    marca: $scope.ganado.porcinos.marca
                };
            }

            $scope.setRoundsProgressData();
        });
    }]);
