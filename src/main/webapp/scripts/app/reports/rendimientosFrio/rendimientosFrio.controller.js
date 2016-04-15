'use strict';

/**
 * @ngdoc function
 * @name portalWebApp.controller:Reporterendimientosfriocontroller
 * @description
 * # Reporterendimientosfriocontroller
 * Controller of the portalWebApp
 */
angular.module('portalWebApp')
    .controller('ReporteRendimientosFrioController', ['$scope', '$log', '$filter', 'moment', 'ClientService', '$sce', 'Principal', 'Constants', 'usSpinnerService', function($scope, $log, $filter, moment, ClientService, $sce, Principal, Constants, usSpinnerService) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;

            $scope.toggleMin = function() {
                $scope.minDate = moment(Constants.minDate).format(Constants.formatDate);
            };

            $scope.toggleMin();

            $scope.dateOptions = {
                formatYear: 'yyyy',
                formatMonth: 'MM',
                formatDay: 'dd',
                startingDay: 1
            };

            $scope.format = Constants.datepickerFormatDate;

            //Auxiliars functions
            $scope.open = function($event, fecha) {
                $event.preventDefault();
                $event.stopPropagation();
                if ('openedStartDate' === fecha) {
                    $scope.openedStartDate = true;
                } else {
                    $scope.openedEndDate = true;
                }
            };

            $scope.startSpin = function() {
                usSpinnerService.spin('spinner-1');
            };

            $scope.stopSpin = function() {
                usSpinnerService.stop('spinner-1');
            };

            $scope.setDataFormRendimientosFrio = function() {
                $scope.rendimientosFrio = {
                    Marca: "000000",
                    Productos: [],
                    TipoProducto: null,
                    TiposProducto: [],
                    StartDate: new Date().getTime(),
                    EndDate: new Date().getTime()
                };
            }

            $scope.getProductos = function() {
                if ($scope.account) {
                    if ($scope.account.client) {
                        if ($scope.account.client.productos) {
                            $scope.rendimientosFrio.Productos = $scope.account.client.productos;

                            for (var producto in $scope.rendimientosFrio.Productos) {
                                var tipoProducto = $scope.rendimientosFrio.Productos[producto].tipoProducto;
                                if (tipoProducto == Constants.B) {
                                    tipoProducto = Constants.BOVINOS;
                                    $scope.rendimientosFrio.TiposProducto.push(tipoProducto);
                                }
                                if (tipoProducto == Constants.P) {
                                    tipoProducto = Constants.PORCINOS;
                                    $scope.rendimientosFrio.TiposProducto.push(tipoProducto);
                                }
                            }
                        }
                    }
                }
            }

            $scope.setDataFormRendimientosFrio();
            $scope.getProductos();

            $scope.getMarcaProducto = function(_productos, _tipoProducto) {
                var marca = null;
                for (var producto in _productos) {
                    var tipoProducto = _productos[producto].tipoProducto;
                    if (_tipoProducto == tipoProducto) {
                        marca = _productos[producto].marca;
                    }
                }
                return marca;
            }

            $scope.clearForm = function() {
                $scope.setDataFormRendimientosFrio();
                $scope.getProductos();
                $scope.content = "";
                // Resets the form validation state.
                $scope.rendimientosFrioForm.$setPristine();
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
                $scope.rendimientosFrio.Marca = $scope.getMarcaProducto($scope.rendimientosFrio.Productos, $scope.tipoProducto);
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
                    var startDate = moment($scope.rendimientosFrio.StartDate).format(Constants.formatDate);
                    var endDate = moment($scope.rendimientosFrio.EndDate).format(Constants.formatDate);
                    var tipoProducto = $scope.tipoProducto;
                    var marca = $scope.rendimientosFrio.Marca;

                    $scope.content = "";
                    $scope.startSpin();
                    ClientService.getReportRendimientoFrio(tipoProducto, marca, startDate, endDate).then(function(blob) {
                        var fileURL = (window.URL || window.webkitURL).createObjectURL(blob);
                        $scope.content = $sce.trustAsResourceUrl(fileURL);
                        $scope.showPdf = true;
                        $scope.stopSpin();
                    });
                }
            };
        });
    }]);
