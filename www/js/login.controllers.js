(function () {
    'use strict';

    angular
        .module('login')
        .controller('loginController', loginController);

    loginController.$inject = ['$state', 'userService'];

    function loginController($state, userService) {
        var loginVm = this;

        loginVm.message = '';
        loginVm.credentials = {
            "username": '',
            "password": ''
        }

        loginVm.login = login;
        loginVm.newUser = newUser;

        function clearData() {
            loginVm.credentials.username = '';
            loginVm.credentials.password = '';
            loginVm.message = '';
        }

        function login() {

            userService
                .login(loginVm.credentials)
                .then(function (response) {
                    var response = response;
                    if (loginVm.credentials.password == response.password) {
                        clearData();
                        userService.setUser(response);
                        $state.transitionTo("menu.favorite");
                    }
                    else {
                        loginVm.message = 'Wrong Username or Password'
                    }
                }, function () {
                    loginVm.message = "Error: Server";
                });
        }

        function newUser() {
            clearData();
            $state.transitionTo("newUser");
        }
    }

})();