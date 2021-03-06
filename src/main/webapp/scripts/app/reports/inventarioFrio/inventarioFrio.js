'use strict';

angular.module('portalWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('inventarioFrio', {
                parent: 'report',
                url: '/inventarioFrio',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Inventario Frío'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/reports/inventarioFrio/inventarioFrio.html',
                        controller: 'ReporteInventarioFrioController'
                    }
                },
                resolve: {
                    
                }
            });
    });
