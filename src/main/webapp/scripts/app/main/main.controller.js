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
                        marca: 0,
                        producto: "Bovinos"
                    },
                    porcinos: {
                        guiasAFavor: 0,
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
                                    $scope.ganado.bovinos.guiasAFavor = $scope.productos[producto].guiasAFavor;
                                    $scope.ganado.bovinos.marca = $scope.productos[producto].marca;
                                }

                                if (tipoProducto == Constants.P) {
                                    $scope.ganado.porcinos.guiasAFavor = $scope.productos[producto].guiasAFavor;
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
