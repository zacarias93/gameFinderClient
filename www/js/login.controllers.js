(function() {
'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    loginController.$inject = ['$state', 'userService'];

    function loginController($state, userService) {
        var loginVm = this;

        loginVm.credentials = {
            "username" : '',
            "password" : ''
        }

        loginVm.message = '';

        var clearData = function() {
            loginVm.credentials.username = '';
            loginVm.credentials.password = '';
            loginVm.message = '';
        }

        loginVm.login = function() {
            loginVm.response = {};

            var response = userService.login(loginVm.credentials)
            .then(function(response) {
                loginVm.response = response;
                if(loginVm.credentials.password == loginVm.response.password) {
                    clearData();
                    $state.transitionTo("menu.favorite");
                }
            }, function() {
                    console.log("Wrong Username or Password");
                    loginVm.message = "Wrong Username or Password";
            });
        }

        loginVm.newUser = function () {
            $state.transitionTo("newUser");
        }

        activate();

        ////////////////

        function activate() { }
    }

})();