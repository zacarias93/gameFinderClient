(function () {
    'use strict';

    angular
        .module('search')
        .controller('searchController', searchController);

    searchController.$inject = ['userService', 'gameService'];
    function searchController(userService, gameService) {
        var searchVm = this;
        var user = userService.getUser();
        searchVm.games = [];
        searchVm.teamnames = [];
        searchVm.selectLeague = '';
        searchVm.selectTeamname = '';
        searchVm.teamCrestURL = '';
        searchVm.leagues = [ "Bundesliga", "English Premier League", "Primera Division" ]

        searchVm.setLeague = league;
        searchVm.search = search;

        function league() {
            gameService
                .getTeamnames(searchVm.selectLeague)
                .then(function (response) {
                    console.log(response);
                    searchVm.teamnames = [];
                    var data = response.data;
                    var numTeams = data.count;
                    for (var i = 0; i < numTeams; i++) {
                        searchVm.teamnames.push(data.teams[i].name)
                    }
                    searchVm.teamnames.sort();
                })
        }

        function search() {
            getCrestURL();
            gameService
                .getGames(searchVm.selectLeague)
                .then(function (response) {
                    searchVm.games = [];
                    var data = response.data;
                    console.log(data);
                    searchVm.games = filterGames(data);
                })
        }

        function filterGames(data) {
            var gamesFiltered = [];
            var games = data.fixtures;
            var numGames = data.count;

            for (var i = 0; i < numGames; i++) {
                if (games[i].status == 'SCHEDULED') {
                    if (games[i].homeTeamName == searchVm.selectTeamname || games[i].awayTeamName == searchVm.selectTeamname) {
                        gamesFiltered.push(games[i]);
                    }
                }
            }
            return gamesFiltered;
        }

        function getCrestURL() {
            var crestURL = '';
            gameService.getStandings(searchVm.selectLeague).then(function (response) {
                var data = response;
                var numTeams = response.standing.length
                for (var i = 0; i < numTeams; i++) {
                    if (searchVm.selectTeamname == data.standing[i].teamName) {
                        searchVm.teamCrestURL = data.standing[i].crestURI;
                    }
                }
            })
        }

    }
})();