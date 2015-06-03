'use strict';


angular.module('bfSite').directive('zoomTarget', function() {

    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            element.zoomTarget();
            element.addClass('zoomTarget');

        }
    };

});