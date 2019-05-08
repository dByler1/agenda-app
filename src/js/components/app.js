'use strict';

/**
 * @ngdoc overview
 * @name msProgram
 * @description
 * # programApp
 *
 * Main module of the application.
 */
angular
  .module('msProgram', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngTouch',
    'ngSanitize',
    'angularLoad'
  ])
  .config(['$routeProvider', '$locationProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'templates/welcome.html'
        })
        .when('/prepare', {
          templateUrl: 'templates/prepare.html',
          controller: 'PrepareController'
        })
        .when('/slack', {
          templateUrl: 'templates/slack.html'
        })
        .when('/schedule', {
          templateUrl: 'templates/schedule.html',
          controller: 'ScheduleController'
        })
        .when('/exhibits', {
          templateUrl: 'templates/exhibits.html',
          controller: 'ExhibitsController'
        })
        .when('/locations', {
          templateUrl: 'templates/locations.html',
          controller: 'LocationsController'
        })
        .when('/library', {
          templateUrl: 'templates/library.html'
        })
        .otherwise({
          redirectTo: '/'
        });

      // $locationProvider.html5Mode(true).hashPrefix('!');
    }
  ]);