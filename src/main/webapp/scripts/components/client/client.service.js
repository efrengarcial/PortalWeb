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
                /**
                 * GET  /client/{marca}/inventariomarca/{tipoproducto} -> get report inventario marca detallado.
                 */
                return APIService.one('client', marca).one('inventariomarca', tipoProducto).withHttpConfig({
                        responseType: 'blob'
                    })
                    .get();
            },
            getReportRendimientoFrio: function(tipoProducto, marca, fromDate, toDate) {
                console.log("fromDate", fromDate, "toDate", toDate, "tipoProducto", tipoProducto, "marca", marca);
                /**
                 * GET  /client/{marca}/rendimientofrio/{tipoProducto}/daterange/{fromDate}/{toDate} ->get report rendimiento frio.
                 */
    //localhost:3000/api/client/852/rendimientofrio/P/daterange/05-04-2016/11-04-2016?cacheBuster=1460433402644
                return APIService.one('client', marca).one('rendimientofrio', tipoProducto).one('daterange', '4-10-2016').one('', '4-11-2016').withHttpConfig({
                        responseType: 'blob'
                    })
                    .get();
            },
        }
    });
