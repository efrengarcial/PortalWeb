'use strict';
/*global $:false */
/**
 * @ngdoc directive
 * @name portalWebApp.directive:datesvalidation
 * @description
 * # directives
 */

angular.module('portalWebApp');

function isEmpty(value) {
    return angular.isUndefined(value) || value === '' || value === null || value !== value;
}

angular.module('portalWebApp').directive('ngFocus', [

    function() {
        var FOCUS_CLASS = 'ng-focused';
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                ctrl.$focused = false;
                element.bind('focus', function(evt) {
                    element.addClass(FOCUS_CLASS);
                    scope.$apply(function() {
                        ctrl.$focused = true;
                    });
                }).bind('blur', function(evt) {
                    element.removeClass(FOCUS_CLASS);
                    scope.$apply(function() {
                        ctrl.$focused = false;
                    });
                });
            }
        };
    }
]);

angular.module('portalWebApp').directive('dateLowerThan', ['$filter',
    function($filter) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                var validateDateRange = function(inputValue) {
                    var fromDate = $filter('date')(inputValue, 'yyyy-MM-dd');
                    var toDate = $filter('date')(attrs.dateLowerThan, 'yyyy-MM-dd');
                    var isValid = isValidDateRange(fromDate, toDate);
                    ctrl.$setValidity('dateLowerThan', isValid);
                    return inputValue;
                };

                ctrl.$parsers.unshift(validateDateRange);
                ctrl.$formatters.push(validateDateRange);
                attrs.$observe('dateLowerThan', function() {
                    validateDateRange(ctrl.$viewValue);
                });
            }
        };
    }
]);


angular.module('portalWebApp').directive('dateGreaterThan', ['$filter',
    function($filter) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                var validateDateRange = function(inputValue) {
                    var fromDate = $filter('date')(attrs.dateGreaterThan, 'yyyy-MM-dd');
                    var toDate = $filter('date')(inputValue, 'yyyy-MM-dd');
                    var isValid = isValidDateRange(fromDate, toDate);
                    ctrl.$setValidity('dateGreaterThan', isValid);
                    return inputValue;
                };

                ctrl.$parsers.unshift(validateDateRange);
                ctrl.$formatters.push(validateDateRange);
                attrs.$observe('dateGreaterThan', function() {
                    validateDateRange(ctrl.$viewValue);
                });
            }
        };
    }
]);

angular.module('portalWebApp').directive('validDateRange', ['$filter',
    function($filter) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                var dateRange = function(inputValue) {
                    var fromDate = $filter('date')(attrs.validDateRange, 'yyyy-MM-dd');
                    var toDate = $filter('date')(inputValue, 'yyyy-MM-dd');
                    var isValid = isRangeGratherThanAMonth(fromDate, toDate);
                    ctrl.$setValidity('validDateRange', isValid);
                    return inputValue;
                };

                ctrl.$parsers.unshift(dateRange);
                ctrl.$formatters.push(dateRange);
                attrs.$observe('validDateRange', function() {
                    dateRange(ctrl.$viewValue);
                });
            }
        };
    }
]);

var isValidDate = function(dateStr) {
    if (dateStr === undefined)
        return false;
    var dateTime = Date.parse(dateStr);
    if (isNaN(dateTime)) {
        return false;
    }
    return true;
};

var getDateDifference = function(fromDate, toDate) {
    return Date.parse(toDate) - Date.parse(fromDate);
};

var isValidDateRange = function(fromDate, toDate) {
    if (fromDate === '' || toDate === '') {
        return true;
    }
    if (isValidDate(fromDate) === false) {
        return false;
    }
    if (isValidDate(toDate) === true) {
        var days = getDateDifference(fromDate, toDate);
        if (days < 0) {
            return false;
        }
    }
    return true;
};


var isRangeGratherThanAMonth = function(fromDate, toDate) {
    if (fromDate === '' || toDate === '') {
        return true;
    }
    if (isValidDate(fromDate) === false) {
        return false;
    }
    if (isValidDate(toDate) === true) {
        var days = getDateDifference(fromDate, toDate);
        if (days > 2592000000) {
            return false;
        }
    }
    return true;
};

var isEmpty = function(value) {
    return angular.isUndefined(value) || value === '' || value === null || value !== value;
};
