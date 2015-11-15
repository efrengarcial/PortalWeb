'use strict';

angular.module('portalWebApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


