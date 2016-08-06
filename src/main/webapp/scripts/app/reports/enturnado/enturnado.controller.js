'use strict';

/**
 * @ngdoc function
 * @name portalWebApp.controller:Reporteenturnadocontroller
 * @description
 * # Reporteenturnadocontroller
 * Controller of the portalWebApp
 */
angular.module('portalWebApp')
    .controller('ReporteEnturnadoController', ['$scope', '$log', '$filter', 'moment', 'ClientService', '$sce', 'Principal', 'Constants', 'usSpinnerService', 'toaster', function($scope, $log, $filter, moment, ClientService, $sce, Principal, Constants, usSpinnerService, toaster) {
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

            var srirachaSauce = 1;
            $scope.sortDataGrid = function(a, b) {
                if (a == b) return 0;
                if (a < b) return -1;
                return srirachaSauce;
            };

            $scope.gridOptions = {
                columnDefs: [{
                    field: 'id',
                    displayName: 'Lote Id',
                    width: 85
                }, {
                    field: 'fecha',
                    displayName: 'Fecha',
                    cellFilter: 'date:\'dd/MM/yyyy\'',
                    width: 90
                }, {
                    field: 'machos',
                    displayName: 'Machos',
                    width: 90
                }, {
                    field: 'hembras',
                    displayName: 'Hembras',
                    width: 100
                }, {
                    field: 'fechaOperacion',
                    displayName: 'Fecha Pesaje',
                    cellFilter: 'date:\'dd/MM/yyyy\'',
                    width: 135
                }],
                data: $scope.dataGrid,
                sortInfo: $scope.sortDataGrid,
                enableColumnResize: true,
                paginationPageSizes: [12, 24, 36],
                paginationPageSize: 10,
                enableHorizontalScrollbar: 2,
                enableVerticalScrollbar: 1,
                enableRowSelection: true,
                multiSelect: false
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

            $scope.setDataFormEnturnado = function() {
                $scope.enturnado = {
                    Marca: "000000",
                    Productos: [],
                    TipoProducto: null,
                    TiposProducto: [],
                    StartDate: new Date().getTime(),
                    EndDate: new Date().getTime(),
                    ShowContainer: true
                };
            }

            $scope.getProductos = function() {
                if ($scope.account) {
                    if ($scope.account.client) {
                        if ($scope.account.client.productos) {
                            $scope.enturnado.Productos = $scope.account.client.productos;

                            for (var producto in $scope.enturnado.Productos) {
                                var tipoProducto = $scope.enturnado.Productos[producto].tipoProducto;
                                if (tipoProducto == Constants.B) {
                                    tipoProducto = Constants.BOVINOS;
                                    $scope.enturnado.TiposProducto.push(tipoProducto);
                                }
                                if (tipoProducto == Constants.P) {
                                    tipoProducto = Constants.PORCINOS;
                                    $scope.enturnado.TiposProducto.push(tipoProducto);
                                }
                            }
                        }
                    }
                }
            }

            $scope.setDataFormEnturnado();
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
                $scope.setDataFormEnturnado();
                $scope.getProductos();
                $scope.gridOptions.data = [];
                $scope.stopSpin();
                // Resets the form validation state.
                $scope.enturnadoForm.$setPristine();
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
                $scope.enturnado.Marca = $scope.getMarcaProducto($scope.enturnado.Productos, $scope.tipoProducto);
            }

            $scope.requiredIconMessage = function() {
                $('.required-icon').tooltip({
                    tooltipClass: 'customTooltip',
                    placement: 'left',
                    title: 'Campo requerido'
                });
            };
            $scope.requiredIconMessage();

            $scope.consultarListaSacrificios = function(isValid) {
                if (isValid) {
                    var startDate = moment($scope.enturnado.StartDate).format(Constants.formatDate);
                    var endDate = moment($scope.enturnado.EndDate).format(Constants.formatDate);
                    var tipoProducto = $scope.tipoProducto;
                    var marca = $scope.enturnado.Marca;

                    $scope.startSpin();
                    ClientService.consultarListaSacrificios(tipoProducto, marca, startDate, endDate).then(function(data) {
                        if (data.length > 0) {
                            $scope.dataGrid = data;
                            $scope.gridOptions.data = $scope.dataGrid;
                        } else {
                            toaster.pop('warning', 'Advertencia', 'No hay elementos para mostrar.');
                            $scope.gridOptions.data = [];
                        }
                        $scope.stopSpin();
                    });
                }
            };
        });
    }]);
