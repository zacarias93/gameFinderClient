(function() {
'use strict';

    angular
        .module('app')
        .service('userService', userService);

    userService.$inject = ['$http', '$q'];

    function userService($http, $q) {
        var currentUser = {};

// THESE GET RETURNED BY THE SERVICE - METHODS PUBLICLY AVAILABLE TO CALL
        var service = {
            getUser : getUser,
            setUser : setUser,
            login : login,
            createUser : createUser,
            updateUser : updateUser, 
        }
        return service;
        
// DEFINE FUNCTIONS HERE

        function getUser() {
            return currentUser;
         }

         function setUser(user) {
             currentUser = user;
             console.log(currentUser);
         }

        function updateUser(user) {

            console.log('updateUser() : ' , user);
            
		    $http.put('http://localhost:8080/update' , user).then(function(response) {
                console.log(response);
            }, function(response) {
                console.log('We were unable to process the request at this time.');
            });
        }

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