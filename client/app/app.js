'use strict';

/**
 *
 */
angular
    .module('polaroiz', [
        'ngAnimate',
        'ngSanitize',
        'ngRoute'

    ]).config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/main.html',
        controller: 'MainController'
      })
     .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });