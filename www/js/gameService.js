(function() {
'use strict';

    angular
        .module('app')
        .service('gameService', gameService);

    gameService.$inject = ['$http'];
    function gameService($http) {

        var games = [];
        var gamesToDisplay = [];  
        var leagues = []      


        var service = {
            getGames : getGames,
            getTeamnames : getTeamnames,
            getStandings : getStandings,
        }
        return service;

        function getGames(league) {
            return $http
                .get(getLeagueURL(league) + 'fixtures')
                .then(function(response) {
                    console.log(response);
                    return response;
                });
        }

        function getTeamnames(league) {
            var url = getLeagueURL(league) + 'teams';
            console.log(url);

            return $http
                .get(url)
                .then(function(response) {
                    console.log(response);
                    return response;
                });
        }

        function getStandings(league) {
            var url = getLeagueURL(league) + 'leagueTable';

            return $http
                .get(url)
                .then(function(response) {
                    console.log(response.data);
                    return response.data;
                }, function(response) {
                    console.log("error in getStandings");
                });
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