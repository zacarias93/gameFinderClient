angular.module('app.core', [])


    .filter('searchForGames', function() {
        return function(input) {
            return input ? '/u2713' : '/u2718';
        };
    });