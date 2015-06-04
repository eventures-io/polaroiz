'use strict';

angular.module('polaroiz')
    .controller('MainController', function ($scope, FlickrResource) {

        FlickrResource.findPictures().then(function (data) {
            $scope.pictures = data;
        });

    });

