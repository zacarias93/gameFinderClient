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

        searchVm.setLeague = function() {
            gameService.getTeamnames(searchVm.selectLeague).then(function(response) {
                searchVm.teamnames = [];
                var data = response;
                var numTeams = data.count;
                for(var i=0; i<numTeams; i++) {
			        searchVm.teamnames.push(data.teams[i].name)
                    }
                    searchVm.teamnames.sort();
                })
        }

        searchVm.search = function() {
            gameService.getGames(searchVm.selectLeague).then(function(response) {
                searchVm.games = [];
                var data = response;
                console.log(data);
                searchVm.games = filterGames(data);
            })
        }

        var filterGames = function(data) {
            var gamesFiltered = [];
            var games = [];
            var numGames = data.count;

            console.log(numGames);

            games =  data.fixtures;
            
            console.log(searchVm.selectTeamname);

            for(var i=0; i<numGames; i++) {
                if(games[i].status == 'SCHEDULED') {
                    if(games[i].homeTeamName == searchVm.selectTeamname || games[i].awayTeamName == searchVm.selectTeamname){
                        gamesFiltered.push(games[i]);
                    }
                }
            }
            console.log(gamesFiltered);
            return gamesFiltered;
        }
    }
})();