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

            var width = $( document ).width() - 200;
            element.css('left', getRandomInt(170, width) + 'px');

            var height = ($( document ).height() * 90 /100) - 200;
            element.css('top', getRandomInt(80, height) + 'px');

            var rotation = getRandomInt(-90, 90);
            element.css('-webkit-transform', 'rotate(' + rotation + 'deg)');
            element.css('-moz-transform', 'rotate(' + rotation + 'deg)');
            element.css('-o-transform', 'rotate(' + rotation + 'deg)');

            var picture = scope.$eval(attrs.content);
            element.find('.polaroid-inner').append('<img src="' + picture.url + '" class="polaroid-image">');

        },
        controller: function ($scope, $element) {
            $scope.click = function () {
                if($element.css('z-index') !== '2'){
                $('.polaroid-outer').not(this).css({'z-index': 1});
                $element.css('z-index', 2);
                }
                else {
                    alert('on top');
                }
            };
        }
    };


});