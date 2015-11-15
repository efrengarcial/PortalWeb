 'use strict';

angular.module('portalWebApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-portalWebApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-portalWebApp-params')});
                }
                return response;
            }
        };
    });
