angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('userService', [function(){

    var user = {};

    var getUser = function() {
        return user;
    }

    var setUser = function(object) {
        user = object;
    }

    return {
        getUser : getUser,
        setUser : setUser
    };

}]);