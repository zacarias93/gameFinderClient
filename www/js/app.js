(function () {
  'use strict';

  angular.module('app', [
    'ionic',
    'login',
    'app.controllers',
    'topFive',
    'settings'
    
  ]);
})();

(function () {
  'use strict';

  angular
    .module('app')
    .run(mainRun);

  mainRun.$inject = ['$ionicPlatform'];

  function mainRun($ionicPlatform) {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
      StatusBar.overlaysWebView(false);

    }
  }
})();


