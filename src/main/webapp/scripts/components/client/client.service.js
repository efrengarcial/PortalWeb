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
                }).get();
            },
            getReportInventarioMarca: function(tipoProducto, marca) {
                return APIService.one('client', marca).one('inventariomarca', tipoProducto).withHttpConfig({
                    responseType: 'blob'
                }).get();
            },
            getReportRendimientoFrio: function(tipoProducto, marca, fromDate, toDate) {
                return APIService.one('client', marca).one('rendimientofrio', tipoProducto).one('daterange', fromDate).one('/', toDate).withHttpConfig({
                    responseType: 'blob'
                }).get();
            },
            consultarLotes: function(tipoProducto, marca, isRemarca, fromDate, toDate) {
                return APIService.one('client', marca).one('lotes', tipoProducto).one('remarca', isRemarca).one('daterange', fromDate).one('/', toDate).withHttpConfig({
                    responseType: 'json'
                }).get();
            },
            getReportPorteria: function(id) {
                return APIService.one('client', 'porteria').one('/', id).withHttpConfig({
                    responseType: 'blob'
                }).get();
            },
            getReportBascula: function(id) {
                return APIService.one('client', 'bascula').one('/', id).withHttpConfig({
                    responseType: 'blob'
                }).get();
            }
        }
    });
