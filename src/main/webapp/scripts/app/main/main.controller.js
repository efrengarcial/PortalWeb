'use strict';

angular.module('portalWebApp')
    .controller('MainController', ['$scope', '$log', '$location', '$state', 'Principal', '$compile', 'Constants', function($scope, $log, $location, $state, Principal, $compile, Constants) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
            $scope.$state = $state;

            function initProductsData() {
                $scope.ganado = {
                    bovinos: {
                        guiasAFavor: 0,
                        guiasEnContra: 0,
                        marca: 0,
                        producto: "Bovinos"
                    },
                    porcinos: {
                        guiasAFavor: 0,
                        guiasEnContra: 0,
                        marca: 0,
                        producto: "Porcinos"
                    }
                }
            }

            initProductsData();

            $scope.setGuiasToProducts = function(guias) {
                var gAFavor = 0;
                var gEnContra = 0;
                if (guias > 0) {
                    gAFavor = guias;
                } else {
                    gEnContra = Math.abs(guias);
                }

                return [gAFavor, gEnContra];
            };

            function getProductos() {
                if ($scope.account) {
                    if ($scope.account.client) {
                        if ($scope.account.client.productos) {
                            $scope.productos = $scope.account.client.productos;
                            for (var producto in $scope.productos) {
                                var tipoProducto = $scope.productos[producto].tipoProducto;

                                if (tipoProducto == Constants.B) {
                                    var guiasB = $scope.setGuiasToProducts($scope.productos[producto].guiasAFavor);
                                    $scope.ganado.bovinos.guiasAFavor = guiasB[0];
                                    $scope.ganado.bovinos.guiasEnContra = guiasB[1];

                                    $scope.ganado.bovinos.marca = $scope.productos[producto].marca;
                                }

                                if (tipoProducto == Constants.P) {
                                    var guiasP = $scope.setGuiasToProducts($scope.productos[producto].guiasAFavor);
                                    $scope.ganado.porcinos.guiasAFavor = guiasP[0];
                                    $scope.ganado.porcinos.guiasEnContra = guiasP[1];

                                    $scope.ganado.porcinos.marca = $scope.productos[producto].marca;
                                }
                            }
                        }
                    }
                }
            }
            getProductos();
        });
    }]).directive('activeLink', function(location) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var clazz = attrs.activeLink;
                var path = attrs.href;
                path = path.substring(1); //hack because path does bot return including hashbang
                scope.location = location;
                scope.$watch('location.path()', function(newPath) {
                    if (path === newPath) {
                        element.addClass(clazz);
                    } else {
                        element.removeClass(clazz);
                    }
                });
            }
        };
    });
