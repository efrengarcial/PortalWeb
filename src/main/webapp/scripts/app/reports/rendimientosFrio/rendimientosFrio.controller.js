'use strict';

/**
 * @ngdoc function
 * @name portalWebApp.controller:Reporterendimientosfriocontroller
 * @description
 * # Reporterendimientosfriocontroller
 * Controller of the portalWebApp
 */
angular.module('portalWebApp')
    .controller('ReporteRendimientosFrioController', ['$scope', '$log', '$filter', 'moment', 'ClientService', '$sce', 'Principal', 'Constants', function($scope, $log, $filter, moment, ClientService, $sce, Principal, Constants) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;

            $scope.toggleMin = function() {
                $scope.minDate = moment(Constants.minDate).format(Constants.formatDate);
            };

            $scope.toggleMin();

            $scope.rendimientosFrio = {
                StartDate: new Date().getTime(),
                EndDate: new Date().getTime()
            };

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

            function setDataFormInventario() {
                $scope.rendimientosFrio = {
                    Marca: "0000",
                    Productos: [],
                    TipoProducto: null,
                    TiposProducto: [],
                    StartDate: new Date().getTime(),
                    EndDate: new Date().getTime()                    
                };
            }

            function getProductos() {
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
            setDataFormInventario();
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
                $log.debug("clearForm");
                $scope.rendimientosFrio.StartDate = new Date().getTime();
                $scope.rendimientosFrio.EndDate = new Date().getTime();

                // Resets the form validation state.
                $scope.rendimientosFrioForm.$setPristine();
            };

            $scope.interacted = function(field) {
                return $scope.submitted || field.$dirty;
            };

            $scope.submitForm = function(isValid) {
                if (isValid) {
                    var startDate = $scope.rendimientosFrio.StartDate;
                    var endDate = $scope.rendimientosFrio.EndDate;
                    var tipoProducto = $scope.rendimientosFrio.Productos[1].tipoProducto;
                    var marca = $scope.rendimientosFrio.Productos[1].marca;

                    $scope.content = "";
                    ClientService.getReportRendimientoFrio(tipoProducto, marca, startDate, endDate).then(function(blob) {
                        /*var file = new Blob([blob], {
                            type: 'application/pdf'
                        });*/
                        var fileURL = (window.URL || window.webkitURL).createObjectURL(blob);
                        //var fileURL = window.URL.createObjectURL(file);
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
        });
    }]);
