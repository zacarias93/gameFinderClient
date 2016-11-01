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

      .state('menu.teams', {
    url: '/Teams',
    views: {
      'tab1': {
        templateUrl: 'templates/teams.html',
        controller: 'teamsCtrl'
      }
    }
  })

  .state('menu.bayernSchedule', {
    url: '/bayernSchedule',
    views: {
      'tab3': {
        templateUrl: 'templates/bayern.html',
        controller: 'bayernCtrl'
      }
    }
  })

  .state('menu.arsenalSchedule', {
    url: '/arsenalSchedule',
    views: {
      'tab4': {
        templateUrl: 'templates/arsenal.html',
        controller: 'arsenalCtrl'
      }
    }
  })

  .state('menu.barcelonaSchedule', {
    url: '/barcelonaSchedule',
    views: {
      'tab5': {
        templateUrl: 'templates/barcelona.html',
        controller: 'barcelonaCtrl'
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

  .state('menu', {
    url: '/home',
    templateUrl: 'templates/menu.html',
    controller: 'loginCtrl',
    abstract:true
  })

$urlRouterProvider.otherwise('/login')

});