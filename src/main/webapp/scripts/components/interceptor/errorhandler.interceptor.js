'use strict';

angular.module('portalWebApp')
    .factory('errorHandlerInterceptor', function ($q, $rootScope,usSpinnerService) {
        return {
            'responseError': function (response) {
                if (!(response.status == 401 && response.data.path !== undefined   && 
                    response.data.path.indexOf("/api/account") == 0 )){
	                $rootScope.$emit('portalWebApp.httpError', response);
	            }
                usSpinnerService.stop('spinner-1');
                return $q.reject(response);
            }
        };
    });