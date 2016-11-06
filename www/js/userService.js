(function() {
'use strict';

    angular
        .module('app')
        .service('userService', userService);

    userService.$inject = ['$http'];

    function userService($http) {
        var currentUser = {};

        var service = {
            getUser : getUser,
            setUser : setUser,
            login : login,
            createUser : createUser,
            updateUser : updateUser, 
        }
        return service;
        
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
		    var url = 'http://localhost:8080/findByUserName/' + credentials.username;

            return $http
                .get(url)
                .then(function(response) {
                    return response.data;
                }, function(response) {
                    console.log('Error w/ login credentials');
                })
        }

        function createUser(user) {

            return $http
                .post('http://localhost:8080/create', user)
                .then(function(response) {
                    return response.data;
                }, function(response) {
                    console.log('error w/ createUser');
                })
        }

    }
})();