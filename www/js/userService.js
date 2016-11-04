(function() {
'use strict';

    angular
        .module('app')
        .service('userService', userService);

    userService.$inject = ['$http', '$q'];

    function userService($http, $q) {
        var user = {};

// THESE GET RETURNED BY THE SERVICE - METHODS PUBLICLY AVAILABLE TO CALL
        var service = {
            getUser : getUser,
            setUser : setUser,
            login : login,
            createUser : createUser
        }
        return service;
        
// DEFINE FUNCTIONS HERE

        function getUser() {
            return user;
         }

        function setUser(object) {
            user = object;
            console.log(user);
            console.log('this is the new improved service yo');
        }

//fixing this!!!
        function login(credentials) {
            var defer = $q.defer();
		    var url = 'http://localhost:8080/findByUserName/' + credentials.username;
            
            $http.get(url).then(function(response) {
                defer.resolve(response.data);
            }, function(response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        function createUser(user) {
            var defer = $q.defer();
            console.log(user);
		    $http.post('http://localhost:8080/create' , user).then(function(response) {
                defer.resolve(response.data);
                console.log(response.data);
            }, function(response) {
                defer.reject(response);
            });
            return defer.promise;
        } 

    }
})();