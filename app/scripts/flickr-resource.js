'use strict'

angular.module('polaroiz').factory('FlickrResource', function ($http, $q) {

    var findPictures = function (subject) {

        var url = 'https://api.flickr.com/services/rest/?format=json&nojsoncallback=?&api_key=db1853e3b042d27e15b301da2b789f4e';
        var query = '&method=flickr.photosets.getPhotos&photoset_id=72157642179604694';

        function Picture(id, title, url, owner, ownerName) {
            this.id = id,
                this.title = title,
                this.url = url ,
                this.owner = owner,
                this.ownerName = ownerName

        }

        var defered = $q.defer();

         $http.get(url + query).
            success(function (data, status, headers, config) {

                var result = [];

                if (data.stat === 'ok') {
                    angular.forEach(data.photoset.photo, function (value, key) {
                        var url = 'https://farm' + value.farm + '.staticflickr.com/' + value.server + '/' + value.id + '_' + value.secret + '_b.jpg';
                        this.push(new Picture(value.id, value.title, url, data.photoset.owner, data.photoset.ownerName));
                    }, result)

                } else {
                    defered.reject('No data received');
                }
                defered.resolve(result)
            }).
            error(function (data, status, headers, config) {
                $log.error('error loading pictures: ' + JSON.stringify(status));
                 defered.reject(status);
            });

        return defered.promise;

    }

    return {

        findPictures: findPictures

    }


})