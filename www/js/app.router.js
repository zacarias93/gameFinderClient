(function () {
  'use strict';

  angular
    .module('app')
    .config(appRouter);

    appRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

    function appRouter($stateProvider, $urlRouterProvider) {

      $stateProvider

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

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginController as loginVm'
      })

     .state('settings', {
        cache: false,
        url: '/settings',
        templateUrl: 'templates/settings.html',
        controller: 'settingsController as settingsVm'
      })

      .state('newUser', {
        url: '/newUser',
        templateUrl: 'templates/newUser.html',
        controller: 'newUserController as newUserVm'
      })

      

  .state('menu.searchSchedule', {
    url: '/searchSchedule',
    views: {
      'tab6': {
        templateUrl: 'templates/search.html',
        controller: 'searchCtrl'
      }
    }
  })

  .state('menu.map', {
    url: '/map',
    // cache: false,
    views: {
      'tab7': {
        templateUrl: 'templates/map.html',
        controller: 'mapCtrl'
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

  .state('menu', {
    url: '/home',
    templateUrl: 'templates/menu.html',
    controller: 'loginController as loginVm',
    abstract:true
  })

$urlRouterProvider.otherwise('/login')

    }
})();



