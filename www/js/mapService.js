(function () {
    'use strict';

    angular
        .module('app')
        .service('mapService', mapService);

    mapService.$inject = ['$http'];
    function mapService($http) {


        var service = {
            getMarkers: getMarkers,

        }
        return service;

        function getMarkers() {
            var url = 'http://localhost:3000/places/';

            return $http
                .get(url)
                .then(function (response) {
                    return response;
                }, function(response) {
                    console.log("Error with Google Maps");
                })
        }

    }
})();