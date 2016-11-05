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
            getTeamnames : getTeamnames,
            getTopFive : getTopFive
            
        }
        return service;

        

        function getGames(league) {
            var defer = $q.defer();
            var url = getLeagueURL(league) + '/fixtures';

            $http.get(url).then(function(response) {
                defer.resolve(response.data);
            }, function(response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function getTeamnames(league) {
            var url = getLeagueURL(league) + '/teams';
            var defer = $q.defer();

            $http.get(url).then(function(response) {
                defer.resolve(response.data);
            }, function(response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function getTopFive(league) {
            var url = getLeagueURL(league) + 'leagueTable';
            var defer = $q.defer();

            $http.get(url).then(function(response) {
                defer.resolve(response.data);
            }, function(response) {
                defer.reject(response);
            });
            return defer.promise;                        
        }

        function getLeagueURL(league) {
            var leagueURL = '';
            switch (league) {
                case 'English Premier League': leagueURL = 'http://api.football-data.org/v1/competitions/426/';
                    break;
                case 'Bundesliga': leagueURL = 'http://api.football-data.org/v1/competitions/430/';
                    break;
                case 'Primera Division' : leagueURL = 'http://api.football-data.org/v1/competitions/436/';
                    break;
                default: leagueURL = 'Something wrong happened in switch statement in gameService';
            }
            return leagueURL;
        }

        

                




        }
})();