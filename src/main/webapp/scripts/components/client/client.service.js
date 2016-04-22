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
            getReportPorteria: function(idLote) {
                return APIService.one('client', 'porteria').one('/', idLote).withHttpConfig({
                    responseType: 'blob'
                }).get();
            },
            getReportBascula: function(idLote) {
                return APIService.one('client', 'bascula').one('/', idLote).withHttpConfig({
                    responseType: 'blob'
                }).get();
            },
            getReportPesoCanal: function(idLote, tipoProducto) {
                console.log('idLote', idLote, 'tipoProducto', tipoProducto);
                return APIService.one('client', 'pesocanal').one('/', idLote).one('/', tipoProducto).withHttpConfig({
                    responseType: 'blob'
                }).get();
            }
        }
    });
