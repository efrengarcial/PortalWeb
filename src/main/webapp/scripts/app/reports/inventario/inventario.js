'use strict';

angular.module('portalWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('inventario', {
                parent: 'report',
                url: '/inventario',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Inventario'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/reports/inventario/inventario.html',
                        controller: 'ReporteInventarioController'
                    }
                },
                resolve: {
                    
                }
            });
    });
