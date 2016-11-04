(function() {
'use strict';

    angular
        .module('app')
        .controller('topFiveController', topFiveController);

    topFiveController.$inject = ['$http', 'userService'];

    function topFiveController($http, userService) {
        var topFiveVm = this;

        topFiveVm.teams = [];
        topFiveVm.user = userService.getUser();

        var url = topFiveVm.user.leagueURL + 'leagueTable';

        $http.get(url)
        .then(function(response) {
        console.log(response);
        topFiveVm.teams = response.data.standing;
        })
        

        activate();

        ////////////////

        function activate() { }
    }
})();