(function() {
'use strict';

    angular
        .module('app')
        .controller('mapController', mapController);

    mapController.$inject = ['$state', '$cordovaGeolocation'];
    function mapController($state, $cordovaGeolocation) {
        var mapVm = this;
        var options = {timeout: 10000, enableHighAccuracy: true};
 
        $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        
            var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        
            mapVm.map = new google.maps.Map(document.getElementById("map"), mapOptions);

            google.maps.event.addListenerOnce(mapVm.map, 'idle', function(){
 
            var marker = new google.maps.Marker({
                map: mapVm.map,
                animation: google.maps.Animation.DROP,
                position: latLng
            });

            var infoWindow = new google.maps.InfoWindow({
            content: "Hello World!"
            });
        
            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(mapVm.map, marker);
            });      
            
            });
        
        }, function(error){
            console.log("Could not get location");
        });        
    }
})();