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

  .state('tabsController.schedule', {
    url: '/Schedule',
    views: {
      'tab3': {
        templateUrl: 'templates/schedule.html',
        controller: 'scheduleCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.arsenalSchedule', {
    url: '/arsenalSchedule',
    templateUrl: 'templates/page.html',
    controller: 'arsenalCtrl'
  })

$urlRouterProvider.otherwise('/page1/arsenalSchedule')

  

});