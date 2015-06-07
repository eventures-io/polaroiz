'use strict';

angular.module('polaroiz')
    .controller('MainController', function ($scope, FlickrResource, $rootScope) {

        $scope.reset = function() {
            $scope.$broadcast('reset_overlay');
        };

//        FlickrResource.loadPicturesFromPhotoSet('72157642179604694').then(function (data) {
//            $scope.pictures = data;
//        });

        FlickrResource.loadPicturesFromGallery('66911286-72157648727697471').then(function (data) {
            $scope.pictures = data;

        });

    });

