'use strict';

angular.module('portalWebApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('enturnado', {
                parent: 'report',
                url: '/enturnado',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Enturnado'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/reports/enturnado/enturnado.html',
                        controller: 'ReporteEnturnadoController'
                    }
                },
                resolve: {

                }
            });
    });
