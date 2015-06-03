'use strict';

angular.module('polaroiz').directive('zoomTarget', function () {

    return {
        restrict: 'E',
        replace: true,
        template: '<div class="polaroid-outer" ng-click="click()"><div class="polaroid-inner"></div></div>',
        link: function (scope, element, attrs) {
            element.zoomTarget();
            element.addClass('zoomTarget');
            element.css('position', 'absolute');
            element.css('left', getRandomInt(0, 500) + 'px');
            element.css('top', getRandomInt(0, 500) + 'px');
            var rotation = getRandomInt(0, 90);
            element.css('-webkit-transform', 'rotate(' + rotation + 'deg)');
            element.css('-moz-transform', 'rotate(' + rotation + 'deg)');
            element.css('-o-transform', 'rotate(' + rotation + 'deg)');
            scope.picture = attrs.content;
        },
        controller: function($scope, $element){
            $scope.click = function(){
                $element.zoomTo({targetsize: 0.7});
                $('.polaroid-outer').not(this).css({'z-index':1});
                $element.css('z-index', 2);
                $scope.apply();
            }
        }
    };

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

});