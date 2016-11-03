angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

    .state('settings', {
      cache: false,
      url: '/settings',
      templateUrl: 'templates/settings.html',
      controller: 'settingsCtrl'
  })

  .state('newUser', {
    url: '/newUser',
    templateUrl: 'templates/newUser.html',
    controller: 'newUserCtrl'
  })

      .state('menu.topFive', {
    url: '/topFive',
    cache: false,
    views: {
      'tab1': {
        templateUrl: 'templates/topFive.html',
        controller: 'topFiveCtrl'
      }
    }
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
    cache: false,
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
        controller: 'favoriteCtrl'
      }
    }
  })

  .state('menu', {
    url: '/home',
    templateUrl: 'templates/menu.html',
    controller: 'loginCtrl',
    abstract:true
  })

$urlRouterProvider.otherwise('/login')

});









  // .state('menu.arsenalSchedule', {
  //   url: '/arsenalSchedule',
  //   views: {
  //     'tab4': {
  //       templateUrl: 'templates/arsenal.html',
  //       controller: 'arsenalCtrl'
  //     }
  //   }
  // })

  // .state('menu.barcelonaSchedule', {
  //   url: '/barcelonaSchedule',
  //   views: {
  //     'tab5': {
  //       templateUrl: 'templates/barcelona.html',
  //       controller: 'barcelonaCtrl'
  //     }
  //   }
  // })