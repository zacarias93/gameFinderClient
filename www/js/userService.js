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
            login : login
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

            return defer.promise
            }
        //         console.log(response);
        //         user = response.data;
        //         return user;

        //         // if(response.data.password === credentials.password) {
        //         //     //login was a success...
        //         //     return user;
        //         // }
        //         // else {
        //         //     return "Wrong Username or Password.";
        //         // }
        //     }
        //     , function(response) {
        //         // return "Something went terribly wrong on the backend.";
        //         return user;
        //     })
        //     return user;
        // }

    }
})();