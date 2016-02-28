'use strict';

angular.module('portalWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('rendimientoDesposteBovinos', {
                parent: 'report',
                url: '/rendimientoDesposteBovinos',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Rrendimiento Desposte Bovinos'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/reports/rendimientoDesposteBovinos/rendimientoDesposteBovinos.html',
                        controller: 'ReporteRendimientoDesposteBovinosController'
                    }
                },
                resolve: {
                    
                }
            });
    });
