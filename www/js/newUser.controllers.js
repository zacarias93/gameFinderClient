(function() {
'use strict';

    angular
        .module('app')
        .controller('newUserController', newUserController);

    newUserController.$inject = ['$state', 'userService'];
    function newUserController($state, userService) {
        var newUserVm = this;
        
        newUserVm.user = {
            "userName" : '',
            "password" : '',
            "email" : '',
            "phoneNum" : '',
            "teamName" : '',
            "league" : '',
            "leagueURL" : ''
        }

        newUserVm.message = '';

        newUserVm.submitNewUser = function() {

        }

        activate();

        ////////////////

        function activate() { }
    }
})();