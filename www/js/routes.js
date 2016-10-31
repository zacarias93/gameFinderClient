angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.teams', {
    url: '/Teams',
    views: {
      'tab1': {
        templateUrl: 'templates/teams.html',
        controller: 'teamsCtrl'
      }
    }
  })

  .state('tabsController.bayernSchedule', {
    url: '/bayernSchedule',
    views: {
      'tab3': {
        templateUrl: 'templates/bayern.html',
        controller: 'bayernCtrl'
      }
    }
  })

  .state('tabsController.arsenalSchedule', {
    url: '/arsenalSchedule',
    views: {
      'tab4': {
        templateUrl: 'templates/arsenal.html',
        controller: 'arsenalCtrl'
      }
    }
  })

  .state('tabsController.barcelonaSchedule', {
    url: '/barcelonaSchedule',
    views: {
      'tab5': {
        templateUrl: 'templates/barcelona.html',
        controller: 'barcelonaCtrl'
      }
    }
  })

  .state('tabsController.searchSchedule', {
    url: '/searchSchedule',
    views: {
      'tab6': {
        templateUrl: 'templates/search.html',
        controller: 'searchCtrl'
      }
    }
  })

  .state('tabsController.login', {
    url: '/login',
    views: {
      'tab7': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  

$urlRouterProvider.otherwise('/page1/arsenalSchedule')

  

});