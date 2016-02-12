'use strict';

angular.module('portalWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('rendimientosFrio', {
                parent: 'report',
                url: '/rendimientosFrio',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Rendimientos Frío'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/reports/rendimientosFrio/rendimientosFrio.html',
                        controller: 'ReporteRendimientosFrioController'
                    }
                },
                resolve: {
                    
                }
            });
    });
