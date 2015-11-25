'use strict';

angular.module('portalWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('report', {
                abstract: true,
                parent: 'site'
            });
    });
