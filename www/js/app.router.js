(function () {
  'use strict';

  angular
    .module('app')
    .config(appRouter);

    appRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

    function appRouter($stateProvider, $urlRouterProvider) {

      $stateProvider

      .state('menu', {
        url: '/home',
        templateUrl: 'templates/menu.html',
        controller: 'loginController as loginVm',
        abstract:true
      })

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginController as loginVm'
      })

      .state('newUser', {
        url: '/newUser',
        templateUrl: 'templates/newUser.html',
        controller: 'newUserController as newUserVm'
      })

      .state('settings', {
        cache: false,
        url: '/settings',
        templateUrl: 'templates/settings.html',
        controller: 'settingsController as settingsVm'
      })

      .state('menu.topFive', {
        url: '/topFive',
        cache: false,
        views: {
          'tab1': {
            templateUrl: 'templates/topFive.html',
            controller: 'topFiveController as topFiveVm'
          }
        }
      })

    .state('menu.favorite', {
      url: '/favorite',
      cache: false,
        views: {
          'tab2': {
            templateUrl: 'templates/favorite.html',
            controller: 'favoriteController as favoriteVm'
          }
        }
    })

    .state('menu.map', {
      url: '/map',
      cache: false,
        views: {
          'tab3': {
            templateUrl: 'templates/map.html',
            controller: 'mapController as mapVm'
          }
        }
    })

    .state('menu.searchSchedule', {
        url: '/searchSchedule',
        cache: false,
        views: {
          'tab4': {
            templateUrl: 'templates/search.html',
            controller: 'searchController as searchVm'
          }
        }
      })

$urlRouterProvider.otherwise('/login')

    }
})();



