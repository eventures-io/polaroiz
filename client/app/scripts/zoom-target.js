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

//    var img = $('<img id="dynamic">'); //Equivalent: $(document.createElement('img'))
//    img.attr('src', responseObject.imgurl);
//    img.appendTo('#imagediv');

//    myImage.addEventListener('onload', function() {
//        console.log('My width is: ', this.naturalWidth);
//        console.log('My height is: ', this.naturalHeight);
//    });
                var picture = scope.$eval(attrs.content);
                var img = $('<img class="polaroid-image">').attr('src', picture.url)
                    .load(function() {
                        //$log.debug(this.naturalWidth +  ' ' + this.naturalHeight)
                        element.css('height', this.naturalHeight / 4);
                        element.css('width',this.naturalWith / 4);

                        var viewWith = $( document ).width() - 200;
                        element.css('left', getRandomInt(170, viewWith) + 'px');

                        var viewHeight = ($( document ).height() * 90 /100) - 200;
                        element.css('top', getRandomInt(80, viewHeight) + 'px');

                        var rotation = getRandomInt(-90, 90);
                        element.css('-webkit-transform', 'rotate(' + rotation + 'deg)');
                        element.css('-moz-transform', 'rotate(' + rotation + 'deg)');
                        element.css('-o-transform', 'rotate(' + rotation + 'deg)');

                        element.find('.polaroid-inner').append(this);


                    });







        },
        controller: function ($scope, $element) {
            $scope.click = function () {
                if($element.css('z-index') !== '2'){
                $('.polaroid-outer').not(this).css({'z-index': 1});
                $element.css('z-index', 2);
                }
                else {
                    //alert('on top');
                }
            };
        }
    };


});