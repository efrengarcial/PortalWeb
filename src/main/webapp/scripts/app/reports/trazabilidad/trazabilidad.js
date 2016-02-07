'use strict';

angular.module('portalWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('trazabilidad', {
                parent: 'report',
                url: '/trazabilidad',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Trazabildad'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/reports/trazabilidad/trazabilidad.html',
                        controller: 'ReporteTrazabilidadController'
                    }
                },
                resolve: {
                    
                }
            });
    });
