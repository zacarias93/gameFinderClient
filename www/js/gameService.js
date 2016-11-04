(function() {
'use strict';

    angular
        .module('app')
        .service('gameService', gameService);

    gameService.$inject = ['$http', '$q'];
    function gameService($http, $q) {

        var games = [];
        var gamesToDisplay = [];
        


        var service = {
            getGames : getGames,
            getTeamnames : getTeamnames
            
        }
        return service;

        

        function getGames(user) {
            var defer = $q.defer();
            var url = user.leagueURL + '/fixtures';

            $http.get(url).then(function(response) {
                defer.resolve(response.data);
            }, function(response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function getTeamnames(user) {
            var defer = $q.defer();
            var url = user.leagueURL + '/teams';

            $http.get(url).then(function(response) {
                defer.resolve(response.data);
            }, function(response) {
                defer.reject(response);
            });
            return defer.promise;
        }

                




        }
})();