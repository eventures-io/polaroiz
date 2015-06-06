'use strict';

angular.module('polaroiz').directive('zoomTarget', function () {

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    return {
        restrict: 'E',
        replace: true,
        template: '<div class="polaroid-outer" ng-click="click()"><div class="polaroid-inner"><div class="overlay"><p>{{picture.comment}}</p></div></div></div></div>',
        scope: {
        },
        link: function (scope, element, attrs) {
            element.zoomTarget();
            element.addClass('zoomTarget');
            element.css('position', 'absolute');

            var picture = scope.$eval(attrs.content);
            scope.picture = picture;

            var img = $('<img class="polaroid-image">').attr('src', picture.url)
                .load(function () {
                    element.css('height', this.naturalHeight / 4);
                    element.css('width', this.naturalWith / 4);

                    var viewWith = $(document).width() - 200;
                    element.css('left', getRandomInt(170, viewWith) + 'px');

                    var viewHeight = ($(document).height() * 90 / 100) - 200;
                    element.css('top', getRandomInt(80, viewHeight) + 'px');

                    var rotation = getRandomInt(-90, 90);
                    element.css('-webkit-transform', 'rotate(' + rotation + 'deg)');
                    element.css('-moz-transform', 'rotate(' + rotation + 'deg)');
                    element.css('-o-transform', 'rotate(' + rotation + 'deg)');

                    element.find('.polaroid-inner').append(this);

                });

        },
        controller: function ($scope, $element, $log) {

            var handlerIn =  function() {
                var imgHeight = $element.find('img').css('height');
                var overlay = $element.find('.overlay');
                overlay.css('height', imgHeight);
                overlay.addClass('overlay-visible');
            }

            var handlerOut =  function() {
                $element.find('.overlay').removeClass('overlay-visible');
            }

            $scope.click = function () {
                if ($element.css('z-index') !== '2') {
                    var outer = $('.polaroid-outer').not(this);
                    outer.css({'z-index': 1});
                    outer.unbind("mouseenter");
                    outer.unbind("mouseleave");
                    $element.css('z-index', 2);
                    $element.mouseenter( handlerIn ).mouseleave( handlerOut );
                }

            };
        }
    };


});