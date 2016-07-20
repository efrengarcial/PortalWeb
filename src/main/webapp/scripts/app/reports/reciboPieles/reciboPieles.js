'use strict';

angular.module('portalWebApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('reciboPieles', {
                parent: 'report',
                url: '/reciboPieles',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Recibo Pieles'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/reports/reciboPieles/reciboPieles.html',
                        controller: 'ReporteReciboPielesController'
                    }
                },
                resolve: {

                }
            });
    });
