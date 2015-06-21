'use strict';

/**
 *
 */
angular
    .module('polaroiz', [
        'ngAnimate',
        'ngSanitize',
        'ngRoute',
        'evtrs.loader'

    ]).config(function ($routeProvider, $locationProvider, $httpProvider) {

        $httpProvider.interceptors.push('HttpRequestInterceptor');

        $routeProvider
            .when('/', {
                templateUrl: 'app/views/main.html',
                controller: 'MainController'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }).constant('LoaderConfig', {API_ENDPOINT: 'flickr.com'});
