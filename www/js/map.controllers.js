(function() {
'use strict';

    angular
        .module('app')
        .controller('mapController', mapController);

    mapController.$inject = ['mapService', '$state', '$cordovaGeolocation'];
    function mapController(mapService, $state, $cordovaGeolocation) {
        var mapVm = this;

        var options = {timeout: 10000, enableHighAccuracy: true};
 
        $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            console.log(latLng);
        
            var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        
            mapVm.map = new google.maps.Map(document.getElementById("map"), mapOptions);

            google.maps.event.addListenerOnce(mapVm.map, 'idle', function(){

            loadMarkers();
 
            var marker = new google.maps.Marker({
                map: mapVm.map,
                animation: google.maps.Animation.DROP,
                position: latLng
            });

            console.log('latlng:', latLng);

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

        function loadMarkers() {
            mapService.getMarkers().then(function(response) {
            var data = response.data;
            console.log('Markers: ', data);
            var length = data.length;

            // for(var i=0; i<length; i++) {
            //     var place = data[i];
            //     console.log(place);
            //     var markerPos = new google.maps.LatLng(place.lat, place.lng);
            //     console.log(markerPos);


            //     // adds the marker to the map
            //     var marker = new google.maps.Marker({
            //         map: mapVm.map,
            //         animation: google.maps.Animation.DROP,
            //         position = markerPos
            //     });



                // http://www.joshmorony.com/part-1-using-the-http-service-in-ionic-to-dynamically-load-google-map-markers/
                // go there if you want info on the markers..
            
            });
        }


    }
})();