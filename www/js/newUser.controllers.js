(function() {
'use strict';

    angular
        .module('app')
        .controller('newUserController', newUserController);

    newUserController.$inject = ['$state', 'userService'];
    function newUserController($state, userService) {
        var newUserVm = this;
        
        newUserVm.user = {
            "username" : '',
            "password" : '',
            "email" : '',
            "phoneNum" : '',
            "teamname" : '',
            "league" : '',
            "leagueURL" : ''
        }

        newUserVm.message = '';

        newUserVm.submitNewUser = function() {

        var response = userService.createUser(newUserVm.user)
            .then(function(response) {
                newUserVm.message = response.message;
                if(newUserVm.message == "Success!") {
                    $state.transitionTo("login");
                }
            })
        }

        activate();

        ////////////////

        function activate() { }
    }
})();