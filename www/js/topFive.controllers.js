(function () {
    'use strict';

    angular
        .module('topFive')
        .controller('topFiveController', topFiveController);

    topFiveController.$inject = ['$http', 'userService', 'gameService'];

    function topFiveController($http, userService, gameService) {
        var topFiveVm = this;
        topFiveVm.teams = [];

        topFiveVm.user = userService.getUser();
        console.log(topFiveVm.user);

        function response() {
            gameService
                .getStandings(topFiveVm.user.league)
                .then(function (response) {
                    var data = response;
                    var numTeams = response.standing.length

                    for (var i = 0; i < numTeams; i++) {
                        topFiveVm.teams.push(data.standing[i]);
                    }
                    console.log(topFiveVm.teams);
                })
        }
    }
})();