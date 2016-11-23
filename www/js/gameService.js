(function () {
    'use strict';

    angular
        .module('app')
        .service('gameService', gameService);

    gameService.$inject = ['$http'];
    function gameService($http) {

        var games = {};
        var parsedGames = [];
        var game = {
            "homeTeamName" : '',
            "awayTeamName" : '',
            "date" : '',
            "status" : ''
        }

        var service = {
            getGames: getGames,
            getTeamnames: getTeamnames,
            getStandings: getStandings,
            sendGames: sendGames,
            parseGames: parseGames,
            clearGame: clearGame,
            getAllGames: getAllGames,
        }
        return service;

        function clearGame() {
            game = {
            "homeTeamName" : '',
            "awayTeamName" : '',
            "date" : '',
            "status" : ''
            }
        }

        function parseGames() {
            for(var i=0; i<games.length; i++) {
                // console.log(games[i]);
                game.homeTeamName = games[i].homeTeamName;
                game.awayTeamName = games[i].awayTeamName;
                game.date = games[i].date;
                game.status = games[i].status;
                parsedGames.push(game);
                // console.log("parsedGames[" + i +"] : ");
                // console.log(parsedGames[i]);
                clearGame();
            }
        }

        function sendGames() {
            parseGames();
            console.log("size: " + parsedGames.length);
            console.log(parsedGames);
            $http
                .put('http://localhost:8080/getGames', parsedGames)
                .then(function(response) {
                    return response;
                }, function(response) {
                    console.log("error w/ sending games to Spring");
                })
            parsedGames = [];
        }

        function getAllGames() {
            getGames('English Premier League');
            getGames('Bundesliga');
            getGames('Primera Division');
        }

        function getGames(league) {
            return $http
                .get(getLeagueURL(league) + 'fixtures')
                .then(function (response) {
                    // console.log(response);
                    games = response.data.fixtures;
                    // console.log(games);
                    sendGames();
                    return response;
                });
        }

        function getTeamnames(league) {
            var url = getLeagueURL(league) + 'teams';
            console.log(url);

            return $http
                .get(url)
                .then(function (response) {
                    console.log(response);
                    return response;
                });
        }

        function getStandings(league) {
            var url = getLeagueURL(league) + 'leagueTable';

            return $http
                .get(url)
                .then(function (response) {
                    console.log(response.data);
                    return response.data;
                }, function (response) {
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
                case 'Primera Division': leagueURL = 'http://api.football-data.org/v1/competitions/436/';
                    break;
                default: leagueURL = 'Something wrong happened in switch statement in gameService';
            }
            return leagueURL;
        }

    }
})();