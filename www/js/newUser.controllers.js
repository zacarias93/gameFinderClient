(function() {
'use strict';

    angular
        .module('newUser')
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
            'league' : '',
            "prediction" : ''
            
        }

        newUserVm.message = '';

        newUserVm.clear = function() {
            newUserVm.user.username = '',
            newUserVm.user.password = '',
            newUserVm.user.phoneNum = '',
            newUserVm.user.email = ''
        }

        newUserVm.submitNewUser = function() {

        var response = userService.createUser(newUserVm.user)
            .then(function(response) {
                console.log(response);
                newUserVm.message = response.message;
                if(newUserVm.message == "Success!") {
                    newUserVm.clear();
                    $state.transitionTo("login");
                }
                else {
                    console.log("check");
                    newUserVm.clear();
                }
            })
        }

        newUserVm.backToLogin = function() {
            $state.transitionTo("login");
        }
    }
})();