'use strict';

angular.module('portalWebApp')
    .controller('MainController', ['$scope', '$log', 'Principal', '$compile', function($scope, $log, Principal, $compile) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;

            $scope.bovinos = {
                guiasAFavor: 0,
                showImg: false,
                marca: 0,
                tipoProducto: "B"
            };
            $scope.porcinos = {
                guiasAFavor: 0,
                showImg: false,
                marca: 0,
                tipoProducto: "P"

            };
            //TEMPORAL ELIMINAR APENAS ESTE EL SERVICIO DISPONIBLE
            var productoTmp = [{ "guiasAFavor": 28, "marca": 674, "tipoProducto": "B" }, /*{"guiasAFavor":59,"marca":852,"tipoProducto":"P"}*/ ];


            if ($scope.account) {
                if ($scope.account.client) {
                    if ($scope.account.client.productos) {
                        $scope.productos = $scope.account.client.productos;

                        for (var producto in $scope.productos) {
                            var tipoProducto = $scope.productos[producto].tipoProducto;

                            if (tipoProducto == "B") {
                                $scope.bovinos.showImg = true;
                                $scope.bovinos.guiasAFavor = $scope.productos[producto].guiasAFavor;
                            }

                            if (tipoProducto == "P") {
                                $scope.porcinos.showImg = true;
                                $scope.porcinos.guiasAFavor = $scope.productos[producto].guiasAFavor;
                            }
                        }
                    }
                }
            }

            // Here I synchronize the value of label and percentage in order to have a nice demo
            $scope.$watch('roundProgressData', function(newValue, oldValue) {
                if (!newValue) {
                    newValue = $scope.roundProgressData = {
                        label: 0,
                        percentage: 0
                    };
                }
                newValue.percentage = newValue.label / 100;
            }, true);

            $scope.guiasBovinos = function() {
                $scope.roundProgressData = {
                    label: $scope.bovinos.guiasAFavor,
                    percentage: $scope.bovinos.guiasAFavor,
                    tipoGanado: "Bovinos"
                };
            };

            $scope.guiasPorcinos = function() {
                $scope.roundProgressData = {
                    label: $scope.porcinos.guiasAFavor,
                    percentage: $scope.porcinos.guiasAFavor,
                    tipoGanado: "Porcinos"
                };
            };

            if ($scope.bovinos.showImg == true) {
                $scope.guiasBovinos();
            } else if ($scope.porcinos.showImg == true) {
                $scope.guiasPorcinos();
            }
        });
    }]);
