'use strict';

angular.module('portalWebApp')
    .factory('ClientService', function(Restangular, APIService) {
        return {
            getById: function(identificationNumber) {
                return APIService.one('client', identificationNumber).get();
            }
        }
    });