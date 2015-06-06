'use strict'

//72157642179604694
angular.module('polaroiz').factory('FlickrResource', function ($http, $q, $log) {

    var Picture = function (id, title, url, owner, ownerName, comment) {
        this.id = id,
            this.title = title,
            this.url = url ,
            this.owner = owner,
            this.ownerName = ownerName,
            this.comment = comment
    };

    var logError = function (message, deferred) {
        $log.error('error loading pictures: ' + JSON.stringify(message));
        deferred.reject(message);
    };

    var getUrl = function (imgData) {
        return 'https://farm' + imgData.farm + '.staticflickr.com/' + imgData.server + '/' + imgData.id + '_' + imgData.secret + '_b.jpg';
    };

    var url = 'https://api.flickr.com/services/rest/?format=json&nojsoncallback=?&api_key=db1853e3b042d27e15b301da2b789f4e';

    var loadPicturesFromPhotoSet = function (photosetId) {

        var query = '&method=flickr.photosets.getPhotos&photoset_id=' + photosetId;
        var deferred = $q.defer();

        $http.get(url + query).
            success(function (data) {

                var result = [];

                if (data.stat === 'ok' && data.photoset.photo.length > 0) {
                    angular.forEach(data.photoset.photo, function (value) {
                        this.push(new Picture(value.id, value.title, getUrl(value), data.photoset.owner, data.photoset.ownerName));
                    }, result);

                } else {
                    logError('No pictures received', deferred);
                }
                deferred.resolve(result)
            }).
            error(function (data, status, headers, config) {
                logError(status, deferred);
            });

        return deferred.promise;

    };

    //66911286-72157648727697471
    var loadPicturesFromGallery = function (gallery_id) {

        var query = '&method=flickr.galleries.getPhotos&gallery_id=' + gallery_id;
        var deferred = $q.defer();

        $http.get(url + query).
            success(function (data) {

                var result = [];

                if (data.stat === 'ok' && data.photos.photo.length > 0) {
                    angular.forEach(data.photos.photo, function (value) {

                        this.push(new Picture(value.id, value.title, getUrl(value), value.owner, null, value._comment));

                    }, result);

                } else {
                    logError('No pictures received', deferred);
                }
                deferred.resolve(result)
            }).
            error(function (data, status, headers, config) {
                logError(status, deferred);
            });

        return deferred.promise;
    };

    return {
        loadPicturesFromPhotoSet: loadPicturesFromPhotoSet,
        loadPicturesFromGallery: loadPicturesFromGallery

    };

})