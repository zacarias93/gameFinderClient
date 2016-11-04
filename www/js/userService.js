(function() {
'use strict';

    angular
        .module('app')
        .service('userService', userService);

    userService.$inject = [];
    function userService() {
        var user = {};

// THESE GET RETURNED BY THE SERVICE - METHODS PUBLICLY AVAILABLE TO CALL
        var service = {
            getUser : getUser,
            setUser : setUser
        }
  
        return service;
        // this.exposedFn = exposedFn;
        


// DEFINE FUNCTIONS HERE
        function getUser() {
            return user;
         }

        function setUser(object) {
            user = object;
            console.log(user);
            console.log('this is the new improved service yo');
        }

    }
})();