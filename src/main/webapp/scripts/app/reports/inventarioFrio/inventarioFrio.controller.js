'use strict';

/**
 * @ngdoc function
 * @name portalWebApp.controller:Reporteinventariofriocontroller
 * @description
 * # Reporteinventariofriocontroller
 * Controller of the portalWebApp
 */
angular.module('portalWebApp')
    .controller('ReporteInventarioFrioController', ['$scope', '$log', 'ClientService', '$sce', 'Principal', 'Constants',
        function($scope, $log, ClientService, $sce, Principal, Constants) {
            Principal.identity().then(function(account) {
                $scope.account = account;
                $scope.isAuthenticated = Principal.isAuthenticated;

                function setFormInventarioFrio() {
                    $scope.inventarioFrio = {
                        Marca: "0000",
                        Productos: [],
                        TipoProducto: null,
                        TiposProducto: []
                    };
                }

                function getProductos() {
                    if ($scope.account) {
                        if ($scope.account.client) {
                            if ($scope.account.client.productos) {
                                $scope.inventarioFrio.Productos = $scope.account.client.productos;
                                //$log.debug(JSON.stringify($scope.account.client));

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
                }
                setFormInventarioFrio();
                getProductos();

                function getMarcaProducto(productos, _tipoProducto) {
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
                    setFormInventarioFrio();
                    getProductos();
                    $scope.inventarioFrioForm.$setPristine();
                    //$rootScope.$broadcast('clear');
                };

                $scope.getReporteInventarioFrio = function(isValid) {
                    if (isValid) {
                        var tipoProducto = $scope.tipoProducto;
                        var marca = $scope.inventarioFrio.Marca;
                        //$scope.clearForm();
                        $scope.content = "";

                        ClientService.getReportInventarioFrio(tipoProducto, marca).then(function(blob) {
                            /*var file = new Blob([blob], {
                                type: 'application/pdf'
                            });*/
                            var fileURL = (window.URL || window.webkitURL).createObjectURL(blob);
                            //var fileURL = window.URL.createObjectURL(file);
                            $log.debug("fileURL is " + fileURL);
                            $scope.content = $sce.trustAsResourceUrl(fileURL);
                            $scope.showPdf = true;

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
                    $scope.inventarioFrio.Marca = getMarcaProducto($scope.inventarioFrio.Productos, $scope.tipoProducto);
                }

                $scope.requiredIconMessage = function() {
                    $('.required-icon').tooltip({
                        tooltipClass: 'customTooltip',
                        placement: 'left',
                        title: 'Campo requerido'
                    });
                };
            });
        }
    ]);
