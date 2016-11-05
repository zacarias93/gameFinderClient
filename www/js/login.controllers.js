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
                    userService.setUser(loginVm.response);
                    $state.transitionTo("menu.favorite");
                }
                else {
                    loginVm.message = 'Wrong Username or Password'
                }
            }, function() {
                loginVm.message = "Error: Server";
            });
        }

        loginVm.newUser = function () {
            $state.transitionTo("newUser");
        }
    }

})();