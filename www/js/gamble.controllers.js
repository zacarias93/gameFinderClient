(function() {
'use strict';

    angular
        .module('app')
        .controller('gambleController', gambleController);

    gambleController.$inject = ['userService', 'gameService', '$q'];
    function gambleController(userService, gameService, $q) {

        var gambleVm = this;
        var games = [];
        var thirdRankTeam = getThirdRankTeam();

        gambleVm.league = userService.getUser().league
        gambleVm.matchOfTheWeek = {};


//initialize team values then run your function w/ a button! COME BACK TO THIS
        function getMatchOfTheWeek() {
            console.log(gambleVm.league);
            gameService.getGames(gambleVm.league).then(function(response) {
                games = response.fixtures;
                console.log(games);


                // for(var i=0; i<380; i++) {
                //     if(games[i].status == 'SCHEDULED') {
                //         if(games[i].awayTeamName == teamname || games[i].homeTeamName == teamname) {
                //             gambleVm.matchOfTheWeek = games[i];
                //             console.log(gambleVm.matchOfTheWeek);
                //         }
                //     }
                // }
            })
        }

        function getThirdRankTeam() {
            gameService.getStandings(gambleVm.league).then(function(response) {
                var data = response.standing;
                thirdRankTeam = data[2].teamName;
                console.log(thirdRankTeam);
                return thirdRankTeam;
            })
        }




        activate();

        ////////////////

        function activate() {
            gameService.getStandings(gambleVm.league).then(function(response) {
                var data = response.standing;
                thirdRankTeam = data[2].teamName;
                console.log(thirdRankTeam);
                return thirdRankTeam;
            })
        }
        

    }
})();