(function() {
'use strict';

    angular
        .module('app')
        .controller('favoriteController', favoriteController);

    favoriteController.$inject = ['userService', 'gameService', '$state'];
    function favoriteController(userService, gameService, $state) {
        var favoriteVm = this;
        favoriteVm.user = {};
        favoriteVm.games = [];
        favoriteVm.message = '';

        favoriteVm.gamesToDisplay = [];

        favoriteVm.user = userService.getUser();
        console.log(favoriteVm.user);

        gameService
            .getGames(favoriteVm.user.league)
            .then(function(response) {
                console.log(response)
                var data = response.data;
                filterGames(data);
            })
            .catch(function(err) {
                favoriteVm.message = 'Please go select a team to follow!';
            });
        
        var filterGames = function(data) {
            console.log(data);
            var numGames = data.count;
            var games =  data.fixtures;

            for(var i=0; i<numGames; i++) {
                if(games[i].status == 'SCHEDULED') {
                    if(games[i].homeTeamName == favoriteVm.user.teamname || games[i].awayTeamName == favoriteVm.user.teamname){
                        favoriteVm.gamesToDisplay.push(games[i]);
                    }
                }
            }
        }
            
        favoriteVm.goToSettings = function() {
            $state.transitionTo('settings');
        }
    }
})();