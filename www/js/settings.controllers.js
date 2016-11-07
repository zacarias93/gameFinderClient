(function () {
    'use strict';

    angular
        .module('settings')
        .controller('settingsController', settingsController);

    settingsController.$inject = ['$state', 'userService', 'gameService'];

    function settingsController($state, userService, gameService) {
        var settingsVm = this;

        settingsVm.user = userService.getUser();
        settingsVm.teamnames = [];
        settingsVm.selectLeague = '';
        settingsVm.selectTeamname = '';
        var numTeams;
        var team = settingsVm.user.teamname;
        settingsVm.leagues = [ "Bundesliga", "English Premier League", "Primera Division" ]

        settingsVm.backToMain = backToMain;
        settingsVm.setTeam = setTeam;
        settingsVm.setLeague = setLeague;
        settingsVm.setTeamnames = setTeamnames;

        function backToMain() {
            $state.transitionTo("menu.favorite");
        }

        function setTeam() {
            settingsVm.user.teamname = settingsVm.selectTeamname;
            userService.updateUser(settingsVm.user);
        }

        function setLeague() {
            settingsVm.user.league = settingsVm.selectLeague;
            settingsVm.setTeamnames();
        }

        function setTeamnames() {
            settingsVm.teamnames = [];

            gameService
                .getTeamnames(settingsVm.user.league)
                .then(function (response) {
                    var data = response.data;
                    var numTeams = data.count;
                    
                    for (var i = 0; i < numTeams; i++) {
                        settingsVm.teamnames.push(data.teams[i].name);
                    }
                    settingsVm.teamnames.sort();
                })
        }
    }
})();