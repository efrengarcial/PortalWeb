'use strict';

angular.module('portalWebApp')
    .factory('ClientService', function(Restangular, APIService) {
        return {
            getById: function(identificationNumber) {
                return APIService.one('client', identificationNumber).get();
            },
            getReportInventarioFrio: function(tipoProducto, marca) {
                return APIService.one('client', marca).one('inventariofrio', tipoProducto).withHttpConfig({
                        responseType: 'blob'
                    })
                    .get();
            },
            getReportInventarioMarca: function(tipoProducto, marca) {
                return APIService.one('client', marca).one('inventariomarca', tipoProducto).withHttpConfig({
                        responseType: 'blob'
                    })
                    .get();
            },
            getReportRendimientoFrio: function(tipoProducto, marca, fromDate, toDate) {
                return APIService.one('client', marca).one('rendimientofrio', tipoProducto).one('daterange', fromDate).one('/', toDate).withHttpConfig({
                        responseType: 'blob'
                    })
                    .get();
            },
        }
    });
