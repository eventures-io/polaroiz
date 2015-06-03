'use strict';

/**
 *
 */
angular
    .module('bfSite', [
        'ngAnimate',
        'ngSanitize',
        'ngNewRouter'
        //'ngTouch'
    ]).config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    } )
    .controller('MainController', function ($router) {
        $router.config([
//            { path: '/', redirectTo: '/home' },
            { path: '/', component: 'home' },
            { path: '/about', component: 'about' }
        ]);
    });
