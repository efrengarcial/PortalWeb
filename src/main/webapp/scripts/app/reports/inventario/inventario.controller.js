'use strict';

/**
 * @ngdoc function
 * @name portalWebApp.controller:Reporteinventariocontroller
 * @description
 * # Reporteinventariocontroller
 * Controller of the portalWebApp
 */
angular.module('portalWebApp')
    .controller('ReporteInventarioController', ['$scope', '$log', 'ClientService', '$sce', 'Principal', 'Constants', 'usSpinnerService', function($scope, $log, ClientService, $sce, Principal, Constants, usSpinnerService) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;

            $scope.startSpin = function() {
                usSpinnerService.spin('spinner-1');
            };

            $scope.stopSpin = function() {
                usSpinnerService.stop('spinner-1');
            };

            $scope.setDataFormInventario = function() {
                $scope.inventario = {
                    Marca: "0000",
                    Productos: [],
                    TipoProducto: null,
                    TiposProducto: [],
                    ShowContainer: true
                };
            }

            $scope.getProductos = function() {
                if ($scope.account) {
                    if ($scope.account.client) {
                        if ($scope.account.client.productos) {
                            $scope.inventario.Productos = $scope.account.client.productos;

                            for (var producto in $scope.inventario.Productos) {
                                var tipoProducto = $scope.inventario.Productos[producto].tipoProducto;
                                if (tipoProducto == Constants.B) {
                                    tipoProducto = Constants.BOVINOS;
                                    $scope.inventario.TiposProducto.push(tipoProducto);
                                }
                                if (tipoProducto == Constants.P) {
                                    tipoProducto = Constants.PORCINOS;
                                    $scope.inventario.TiposProducto.push(tipoProducto);
                                }
                            }
                        }
                    }
                }
            }

            $scope.setDataFormInventario();
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
            }

            $scope.clearForm = function() {
                $scope.setDataFormInventario();
                $scope.getProductos();
                $scope.inventario.ShowContainer = false;
                $scope.inventarioForm.$setPristine();
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
                $scope.inventario.Marca = $scope.getMarcaProducto($scope.inventario.Productos, $scope.tipoProducto);
            }

            $scope.requiredIconMessage = function() {
                $('.required-icon').tooltip({
                    tooltipClass: 'customTooltip',
                    placement: 'left',
                    title: 'Campo requerido'
                });
            };
            $scope.requiredIconMessage();

            $scope.getReport = function(isValid) {
                if (isValid) {
                    var tipoProducto = $scope.tipoProducto;
                    var marca = $scope.inventario.Marca;
                    $scope.inventario.ShowContainer = false;
                    $scope.startSpin();

                    ClientService.getReportInventarioMarca(tipoProducto, marca).then(function(blob) {
                        /*var file = new Blob([blob], {
                            type: 'application/pdf'
                        });*/
                        $scope.inventario.ShowContainer = true;
                        var fileURL = (window.URL || window.webkitURL).createObjectURL(blob);
                        //var fileURL = window.URL.createObjectURL(file);
                        $log.debug("fileURL is " + fileURL);
                        $scope.content = $sce.trustAsResourceUrl(fileURL);
                        $scope.showPdf = true;
                        $scope.stopSpin();
                        //var fileName = "test.pdf";
                        //var a = document.createElement("a");
                        //document.body.appendChild(a);
                        //a.style = "display: none";
                        //a.href = fileURL;
                        //a.download = fileName;
                        //a.click();
                    });
                }
            };
        });
    }]);
