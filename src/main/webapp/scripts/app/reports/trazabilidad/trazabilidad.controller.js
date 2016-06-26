'use strict';

/**
 * @ngdoc function
 * @name portalWebApp.controller:Reportetrazabilidadcontroller
 * @description
 * # Reportetrazabilidadcontroller
 * Controller of the portalWebApp
 */
angular.module('portalWebApp')
    .controller('ReporteTrazabilidadController', ['$scope', '$log', '$filter', 'moment', 'ClientService', '$sce', 'Principal', 'Constants', 'usSpinnerService', 'toaster', function($scope, $log, $filter, moment, ClientService, $sce, Principal, Constants, usSpinnerService, toaster) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;

            $scope.selectedRows = [];

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
                    width: 80
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
                }, {
                    name: 'Porteria',
                    displayName: 'Desembarco',
                    cellTemplate: '<button type="button" class="btn btn-primary active btn-xs" ng-click="grid.appScope.getReportPorteria(row.entity.id);">Orden de Desembarco</button>',
                    width: 130
                }, {
                    name: 'Bascula',
                    displayName: 'Tiquete Báscula',
                    cellTemplate: '<button type="button" class="btn btn-primary active btn-xs" ng-click="grid.appScope.getReportBascula(row.entity.id)">Báscula</button>',
                    width: 155
                }, {
                    name: 'PesoCanal',
                    displayName: 'Peso Canal',
                    cellTemplate: '<button type="button" class="btn btn-primary active btn-xs" ng-click="grid.appScope.getReportPesoCanal(row.entity.id)">Peso Canal</button>',
                    width: 120
                }, {
                    name: 'inventarioFrio',
                    displayName: 'Inventario',
                    cellTemplate: '<button type="button" class="btn btn-primary active btn-xs" ng-click="grid.appScope.getReportInventarioFrioLote(row.entity.id)">Inventario</button>',
                    width: 110
                }, {
                    name: 'rendimientoFrio',
                    displayName: 'Rendimiento Fríos',
                    cellTemplate: '<button type="button" class="btn btn-primary active btn-xs" ng-click="grid.appScope.getReportRendimientoFrioLote(row.entity.id)">Rendimiento</button>',
                    width: 160
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

            $scope.setDataFormTrazabilidad = function() {
                $scope.trazabilidad = {
                    Marca: "000000",
                    Productos: [],
                    TipoProducto: null,
                    TiposProducto: [],
                    StartDate: new Date().getTime(),
                    EndDate: new Date().getTime(),
                    ShowContainer: false,
                    ShowForm: true,
                    Remarca: false,
                    Title: "Información"
                };
            }

            $scope.getProductos = function() {
                if ($scope.account) {
                    if ($scope.account.client) {
                        if ($scope.account.client.productos) {
                            $scope.trazabilidad.Productos = $scope.account.client.productos;

                            for (var producto in $scope.trazabilidad.Productos) {
                                var tipoProducto = $scope.trazabilidad.Productos[producto].tipoProducto;
                                if (tipoProducto == Constants.B) {
                                    tipoProducto = Constants.BOVINOS;
                                    $scope.trazabilidad.TiposProducto.push(tipoProducto);
                                }
                                if (tipoProducto == Constants.P) {
                                    tipoProducto = Constants.PORCINOS;
                                    $scope.trazabilidad.TiposProducto.push(tipoProducto);
                                }
                            }
                        }
                    }
                }
            };

            $scope.setDataFormTrazabilidad();
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
            };

            $scope.clearForm = function() {
                $scope.setDataFormTrazabilidad();
                $scope.getProductos();
                $scope.content = "";
                $scope.gridOptions.data = [];
                $scope.stopSpin();
                // Resets the form validation state.
                $scope.trazabilidadForm.$setPristine();
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
                $scope.trazabilidad.Marca = $scope.getMarcaProducto($scope.trazabilidad.Productos, $scope.tipoProducto);
            };

            $scope.requiredIconMessage = function() {
                $('.required-icon').tooltip({
                    tooltipClass: 'customTooltip',
                    placement: 'left',
                    title: 'Campo requerido'
                });
            };
            $scope.requiredIconMessage();

            $scope.closeContainer = function() {
                $scope.trazabilidad.ShowContainer = false;
                $scope.trazabilidad.ShowForm = true;
                $scope.trazabilidad.Content = "";
                $scope.trazabilidad.Title = Constants.TRAZABILIDAD_TITLE;
            };

            $scope.getReportTrazabilidad = function(isValid) {
                if (isValid) {
                    var startDate = moment($scope.trazabilidad.StartDate).format(Constants.formatDate);
                    var endDate = moment($scope.trazabilidad.EndDate).format(Constants.formatDate);
                    var tipoProducto = $scope.tipoProducto;
                    var marca = $scope.trazabilidad.Marca;
                    var isRemarca = $scope.trazabilidad.Remarca;

                    $scope.startSpin();
                    ClientService.consultarLotes(tipoProducto, marca, isRemarca, startDate, endDate).then(function(data) {
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

            $scope.getReportPorteria = function(idLote) {
                $scope.startSpin();

                ClientService.getReportPorteria(idLote).then(function(blob) {
                    var fileURL = (window.URL || window.webkitURL).createObjectURL(blob);
                    $scope.trazabilidad.Content = $sce.trustAsResourceUrl(fileURL);
                    $scope.trazabilidad.ShowContainer = true;
                    $scope.trazabilidad.ShowForm = false;
                    $scope.trazabilidad.Title = Constants.PORTERIA_TITLE;
                    $scope.stopSpin();
                });
            };

            $scope.getReportBascula = function(idLote) {
                $scope.startSpin();

                ClientService.getReportBascula(idLote).then(function(blob) {
                    var fileURL = (window.URL || window.webkitURL).createObjectURL(blob);
                    $scope.trazabilidad.Content = $sce.trustAsResourceUrl(fileURL);
                    $scope.trazabilidad.ShowContainer = true;
                    $scope.trazabilidad.ShowForm = false;
                    $scope.trazabilidad.Title = Constants.BASCULA_TITLE;
                    $scope.stopSpin();
                });
            };

            $scope.getReportPesoCanal = function(idLote) {
                var tipoProducto = $scope.tipoProducto;
                $scope.startSpin();

                ClientService.getReportPesoCanal(idLote, tipoProducto).then(function(blob) {
                    var fileURL = (window.URL || window.webkitURL).createObjectURL(blob);
                    $scope.trazabilidad.Content = $sce.trustAsResourceUrl(fileURL);
                    $scope.trazabilidad.ShowContainer = true;
                    $scope.trazabilidad.ShowForm = false;
                    $scope.trazabilidad.Title = Constants.PESO_CANAL_TITLE;
                    $scope.stopSpin();
                });
            };

            $scope.getReportInventarioFrioLote = function(idLote) {
                var tipoProducto = $scope.tipoProducto;
                var marca = $scope.trazabilidad.Marca;
                $scope.startSpin();

                ClientService.getReportInventarioFrioLote(tipoProducto, marca, idLote).then(function(blob) {
                    var fileURL = (window.URL || window.webkitURL).createObjectURL(blob);
                    $scope.trazabilidad.Content = $sce.trustAsResourceUrl(fileURL);
                    $scope.trazabilidad.ShowContainer = true;
                    $scope.trazabilidad.ShowForm = false;
                    $scope.trazabilidad.Title = Constants.INVENTARIO_FRIO_TITLE;
                    $scope.stopSpin();
                });
            };

            $scope.getReportRendimientoFrioLote = function(idLote) {
                var tipoProducto = $scope.tipoProducto;
                var marca = $scope.trazabilidad.Marca;
                $scope.startSpin();

                ClientService.getReportRendimientoFrioLote(tipoProducto, marca, idLote).then(function(blob) {
                    var fileURL = (window.URL || window.webkitURL).createObjectURL(blob);
                    $scope.trazabilidad.Content = $sce.trustAsResourceUrl(fileURL);
                    $scope.trazabilidad.ShowContainer = true;
                    $scope.trazabilidad.ShowForm = false;
                    $scope.trazabilidad.Title = Constants.REDIMIENTO_FRIO_TITLE;
                    $scope.stopSpin();
                });
            };

        });
    }]);
