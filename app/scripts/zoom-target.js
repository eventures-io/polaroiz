'use strict';

angular.module('polaroiz').directive('zoomTarget', function () {

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    return {
        restrict: 'E',
        replace: true,
        template: '<div class="polaroid-outer" ng-click="click()"><div class="polaroid-inner"></div></div>',
        scope: {
        },
        link: function (scope, element, attrs) {
            element.zoomTarget();
            element.addClass('zoomTarget');

            element.css('position', 'absolute');
            element.css('left', getRandomInt(0, 1280) + 'px');
            element.css('top', getRandomInt(0, 600) + 'px');

            var rotation = getRandomInt(-90, 90);
            element.css('-webkit-transform', 'rotate(' + rotation + 'deg)');
            element.css('-moz-transform', 'rotate(' + rotation + 'deg)');
            element.css('-o-transform', 'rotate(' + rotation + 'deg)');

            var picture = scope.$eval(attrs.content);
            element.find('.polaroid-inner').append('<img src="' + picture.url + '" class="polaroid-image">');

        },
        controller: function ($scope, $element) {
            $scope.click = function () {
                $element.zoomTo({targetsize: 0.7});
                $('.polaroid-outer').not(this).css({'z-index': 1});
                $element.css('z-index', 2);
            };
        }
    };


});