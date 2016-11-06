(function() {
'use strict';

    angular
        .module('app')
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

        searchVm.leagues = [
            "Bundesliga",
            "English Premier League",
            "Primera Division"
        ]

        searchVm.setLeague = function() {
            gameService
                .getTeamnames(searchVm.selectLeague)
                .then(function(response) {
                    console.log(response);
                    searchVm.teamnames = [];
                    var data = response.data;
                    var numTeams = data.count;
                    for(var i=0; i<numTeams; i++) {
                        searchVm.teamnames.push(data.teams[i].name)
                        }
                        searchVm.teamnames.sort();
                })
        }

        searchVm.search = function() {
            getCrestURL();
            gameService
                .getGames(searchVm.selectLeague)
                .then(function(response) {
                    searchVm.games = [];
                    var data = response.data;
                    console.log(data);
                    searchVm.games = filterGames(data);
            })
        }

        var filterGames = function(data) {
            var gamesFiltered = [];
            var games = [];
            var numGames = data.count;

            games = data.fixtures;
     
            for(var i=0; i<numGames; i++) {
                if(games[i].status == 'SCHEDULED') {
                    if(games[i].homeTeamName == searchVm.selectTeamname || games[i].awayTeamName == searchVm.selectTeamname){
                        gamesFiltered.push(games[i]);
                    }
                }
            }
            return gamesFiltered;
        }

        var getCrestURL = function() {
            var crestURL = '';
            gameService.getStandings(searchVm.selectLeague).then(function(response) {
                var data = response;
                var numTeams = response.standing.length
                for(var i=0; i<numTeams; i++) {
                    if(searchVm.selectTeamname == data.standing[i].teamName) {
                        searchVm.teamCrestURL = data.standing[i].crestURI;                        
                    }
                }
            })
        }
        
    }
})();