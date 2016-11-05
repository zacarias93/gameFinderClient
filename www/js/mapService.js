(function() {
'use strict';

    angular
        .module('app')
        .service('mapService', mapService);

    mapService.$inject = ['$http', '$q'];
    function mapService($http, $q) {
        
        
        var service = {
            getMarkers : getMarkers,
            
        }
        return service;

        function getMarkers() {
            var defer = $q.defer();
            var url = 'http://localhost:3000/places/';

            $http.get(url).then(
                function(response) {
                defer.resolve(response);
            },  function(response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        }
})();