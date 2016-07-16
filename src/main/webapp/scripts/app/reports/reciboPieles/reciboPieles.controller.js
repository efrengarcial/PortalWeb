'use strict';

/**
 * @ngdoc function
 * @name portalWebApp.controller:Reporterecibopielescontroller
 * @description
 * # Reporterecibopielescontroller
 * Controller of the portalWebApp
 */
angular.module('portalWebApp')
    .controller('ReporteReciboPielesController', ['$scope', '$log', '$filter', 'moment', 'ClientService', '$sce', 'Principal', 'Constants', 'usSpinnerService', 'toaster', '$timeout', function($scope, $log, $filter, moment, ClientService, $sce, Principal, Constants, usSpinnerService, toaster, $timeout) {
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

            $scope.setDataFormReciboPieles = function() {
                $scope.reciboPieles = {
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
                            $scope.reciboPieles.Productos = $scope.account.client.productos;

                            for (var producto in $scope.reciboPieles.Productos) {
                                var tipoProducto = $scope.reciboPieles.Productos[producto].tipoProducto;
                                if (tipoProducto == Constants.B) {
                                    $scope.reciboPieles.TiposProducto.push(tipoProducto);
                                }
                            }
                        }
                    }
                }
            }

            $scope.setDataFormReciboPieles();
            $scope.getProductos();

            $scope.getMarcaProducto = function() {
                var marca = null;
                var productos = $scope.reciboPieles.Productos;
                var tipoProducto = $scope.reciboPieles.TiposProducto[0];

                for (var producto in productos) {
                    var _tipoProducto = productos[producto].tipoProducto;
                    if (_tipoProducto == tipoProducto) {
                        marca = productos[producto].marca;
                    }
                }
                return marca;
            }

            $scope.reciboPieles.Marca = $scope.getMarcaProducto();

            $scope.clearForm = function() {
                $scope.stopSpin();
                $scope.setDataFormReciboPieles();
                $scope.getProductos();
                $scope.reciboPieles.Marca = $scope.getMarcaProducto();
                $scope.reciboPieles.ShowContainer = false;
                // Resets the form validation state.
                $scope.reciboPielesForm.$setPristine();
            };

            $scope.interacted = function(field) {
                return $scope.submitted || field.$dirty;
            };

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
                    var startDate = moment($scope.reciboPieles.StartDate).format(Constants.formatDate);
                    var endDate = moment($scope.reciboPieles.EndDate).format(Constants.formatDate);
                    var tipoProducto = $scope.reciboPieles.TiposProducto[0];
                    var marca = $scope.reciboPieles.Marca;

                    $scope.reciboPieles.ShowContainer = false;
                    $scope.startSpin();
                    ClientService.getReportRendimientoFrio(tipoProducto, marca, startDate, endDate).then(function(blob) {
                        $scope.reciboPieles.ShowContainer = true;
                        var fileURL = (window.URL || window.webkitURL).createObjectURL(blob);
                        $scope.reciboPieles.Content = $sce.trustAsResourceUrl(fileURL);

                        $timeout(function() {
                            $scope.stopSpin();
                        }, 4000);
                    });
                }
            };
        });
    }]);
