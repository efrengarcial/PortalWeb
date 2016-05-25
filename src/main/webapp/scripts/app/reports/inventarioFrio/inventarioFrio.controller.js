'use strict';

/**
 * @ngdoc function
 * @name portalWebApp.controller:Reporteinventariofriocontroller
 * @description
 * # Reporteinventariofriocontroller
 * Controller of the portalWebApp
 */
angular.module('portalWebApp')
    .controller('ReporteInventarioFrioController', ['$scope', '$log', 'ClientService', '$sce', 'Principal', 'Constants', 'usSpinnerService',
        function($scope, $log, ClientService, $sce, Principal, Constants, usSpinnerService) {
            Principal.identity().then(function(account) {
                $scope.account = account;
                $scope.isAuthenticated = Principal.isAuthenticated;

                $scope.startSpin = function() {
                    usSpinnerService.spin('spinner-1');
                };

                $scope.stopSpin = function() {
                    usSpinnerService.stop('spinner-1');
                };

                $scope.setDataFormInventarioFrio = function() {
                    $scope.inventarioFrio = {
                        Marca: "0000",
                        Productos: [],
                        TipoProducto: null,
                        TiposProducto: [],
                        ShowContainer: true
                    };
                };

                $scope.getProductos = function() {
                    if ($scope.account) {
                        if ($scope.account.client) {
                            if ($scope.account.client.productos) {
                                $scope.inventarioFrio.Productos = $scope.account.client.productos;
                                for (var producto in $scope.inventarioFrio.Productos) {
                                    var tipoProducto = $scope.inventarioFrio.Productos[producto].tipoProducto;
                                    if (tipoProducto == Constants.B) {
                                        tipoProducto = Constants.BOVINOS;
                                        $scope.inventarioFrio.TiposProducto.push(tipoProducto);
                                    }
                                    if (tipoProducto == Constants.P) {
                                        tipoProducto = Constants.PORCINOS;
                                        $scope.inventarioFrio.TiposProducto.push(tipoProducto);
                                    }
                                }
                            }
                        }
                    }
                };

                $scope.setDataFormInventarioFrio();
                $scope.getProductos();

                $scope.getMarcaProducto = function(productos, _tipoProducto) {
                    var marca = null;
                    for (var producto in productos) {
                        var tipoProducto = productos[producto].tipoProducto;
                        if (_tipoProducto == tipoProducto) {
                            marca = productos[producto].marca;
                        }
                    }
                    return marca;
                };

                $scope.clearForm = function() {
                    $scope.setDataFormInventarioFrio();
                    $scope.getProductos();
                    $scope.inventarioFrio.ShowContainer = false;
                    $scope.inventarioFrioForm.$setPristine();
                    //$rootScope.$broadcast('clear');
                };

                $scope.interacted = function(field) {
                    return $scope.submitted || field.$dirty;
                };

                $scope.selectProducto = function(_tipoProducto) {
                    if (_tipoProducto == Constants.BOVINOS) {
                        $scope.tipoProducto = Constants.B;
                    }
                    if (_tipoProducto == Constants.PORCINOS) {
                        $scope.tipoProducto = Constants.P;
                    }
                    $scope.inventarioFrio.Marca = $scope.getMarcaProducto($scope.inventarioFrio.Productos, $scope.tipoProducto);
                };

                $scope.requiredIconMessage = function() {
                    $('.required-icon').tooltip({
                        tooltipClass: 'customTooltip',
                        placement: 'left',
                        title: 'Campo requerido'
                    });
                };

                $scope.requiredIconMessage();

                $scope.getReportInventarioFrio = function(isValid) {
                    if (isValid) {
                        var tipoProducto = $scope.tipoProducto;
                        var marca = $scope.inventarioFrio.Marca;
                        $scope.inventarioFrio.ShowContainer = false;
                        $scope.startSpin();

                        ClientService.getReportInventarioFrio(tipoProducto, marca).then(function(blob) {
                            $scope.inventarioFrio.ShowContainer = true;
                            var fileURL = (window.URL || window.webkitURL).createObjectURL(blob);
                            $scope.inventarioFrio.Content = $sce.trustAsResourceUrl(fileURL);
                            $scope.stopSpin();
                        });
                    }
                };
            });
        }
    ]);
