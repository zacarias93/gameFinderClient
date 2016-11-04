(function() {
'use strict';

    angular
        .module('app')
        .service('gameService', gameService);

    gameService.$inject = ['$http', '$q'];
    function gameService($http, $q) {

        var games = [];
        var gamesToDisplay = [];
        


        var service = {
            getGames : getGames
            
        }
        return service;

        

        function getGames(user) {

            console.log(user);
            var defer = $q.defer();
            var url = user.leagueURL + '/fixtures';

            $http.get(url).then(function(response) {
                defer.resolve(response.data);
            }, function(response) {
                defer.reject(response);
            });
            console.log('DEFER.PROMISE');
            console.log(defer.promise);
            return defer.promise;
        }

                




        }
})();