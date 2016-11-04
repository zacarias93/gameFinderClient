(function() {
'use strict';

    angular
        .module('app')
        .controller('favoriteController', favoriteController);

    favoriteController.$inject = ['userService', 'gameService'];
    function favoriteController(userService, gameService) {
        var favoriteVm = this;
        favoriteVm.user = {};
        favoriteVm.games = [];

        favoriteVm.gamesToDisplay = [];

        favoriteVm.user = userService.getUser();
        console.log(favoriteVm.user);

        gameService.getGames(favoriteVm.user).then(function(response) {
                var data = response;
                console.log(data);
                filterGames(data);
        }, function() {
                console.log("Your a wizard Harry, someone messed up");
            });
        
        var filterGames = function(data) {
                console.log(data);
                var numGames = data.count;
                var games =  data.fixtures;

                // console.log(numGames);
                // console.log(games);
                // console.log(games[0]);

                for(var i=0; i<numGames; i++) {
                    if(games[i].status == 'SCHEDULED') {
                        if(games[i].homeTeamName == favoriteVm.user.teamname || games[i].awayTeamName == favoriteVm.user.teamname){
                            favoriteVm.gamesToDisplay.push(games[i]);
                        }
                    }
                }
                console.log(favoriteVm.gamesToDisplay);
            }
    }
})();