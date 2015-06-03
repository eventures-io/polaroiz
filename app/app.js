'use strict';

/**
 *
 */
angular
    .module('polaroiz', [
        'ngAnimate',
        'ngSanitize',
        'ngRoute',
        //'ngTouch',
        'restangular'

    ]).config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
     .otherwise({
        redirectTo: '/'
      });
    });
