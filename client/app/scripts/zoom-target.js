'use strict';

angular.module('polaroiz').directive('zoomTarget', function () {

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/views/zoom-target.html',
        scope: {
        },
        link: function (scope, element, attrs) {
            element.zoomTarget();
            element.addClass('zoomTarget');
            element.css('position', 'absolute');

            //somehow @picture binds to a String, not an Object
            scope.picture = scope.$eval(attrs.picture);

            $('<img class="polaroid-image">').attr('src', scope.picture.url)
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
                    element.css('opacity', 1);

                });

        },
        controller: function ($scope, $element) {

            var handlerIn =  function() {
                var imgHeight = $element.find('img').css('height');
                var overlay = $element.find('.overlay');
                overlay.css('height', imgHeight);
                overlay.addClass('overlay-visible');
            };

            var handlerOut =  function() {
                $element.find('.overlay').removeClass('overlay-visible');
            };

            $scope.$on('reset_overlay', function() {
                $element.unbind('mouseenter');
                $element.unbind('mouseleave');
            });


            var unbindMouseListeners = function () {
                var outer = $('.polaroid-outer').not(this);
                outer.unbind('mouseenter');
                outer.unbind('mouseleave');
            };

            $scope.click = function () {
                if ($element.css('z-index') !== '2') {
                    unbindMouseListeners();
                    $('.polaroid-outer').not(this).css({'z-index': 1});
                    $element.css('z-index', 2);
                    $element.mouseenter( handlerIn ).mouseleave( handlerOut );
                }
            };
        }
    };


});