'use strict';

angular.module('polaroiz').directive('repeatEnd', function () {
    return function (scope, element, attrs) {
        if (scope.$last) {
            setTimeout(function () {
                scope.$emit('images_loaded', element, attrs);
            }, 1);
        }
    };
});