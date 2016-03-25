'use strict';

/**
 * @ngdoc function
 * @name portalWebApp.controller:Reporteinventariofriocontroller
 * @description
 * # Reporteinventariofriocontroller
 * Controller of the portalWebApp
 */
angular.module('portalWebApp')
    .controller('ReporteInventarioFrioController', ['$scope', '$log', 'ClientService', '$sce',
        function($scope, $log, ClientService, $sce) {
            $log.debug("Reporte frío");

            $scope.inventarioFrio = {
                CuartoFrio: 123456
            };

            $scope.clearForm = function() {

                $scope.inventarioFrio = {};

                // Resets the form validation state.
                $scope.inventarioFrioForm.$setPristine();
                // Broadcast the event to also clear the grid selection.
                //$rootScope.$broadcast('clear');
            };

            $scope.buscar = function(isValid) {
                if (isValid) {
                    $log.debug(isValid, parseInt($scope.inventarioFrio.CuartoFrio));
                    $scope.clearForm();
                    ClientService.getReportInventarioFrio('B', 674).then(function(blob) {
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

            $scope.requiredIconMessage = function() {
                $('.required-icon').tooltip({
                    tooltipClass: 'customTooltip',
                    placement: 'left',
                    title: 'Campo requerido'
                });
            };
        }
    ]);