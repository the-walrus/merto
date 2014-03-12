var map;

function initialize() {
    geocoder = new google.maps.Geocoder();

    var latlng = new google.maps.LatLng(55.5, 38);
    var mapOptions = {
        zoom: 8,
        center: latlng
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


    allStations.forEach(function (value) {

        var flightPlanCoordinates = [];

        value['stations'].forEach(function (value) {
            flightPlanCoordinates.push(new google.maps.LatLng(value.lat, value.lng));
        });

        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: value['color'],
            strokeOpacity: 1.0,
            strokeWeight: 5
        });
        flightPath.setMap(map);
    });
}
var geocoder;

function codeAddress(fullAddress, address) {
    geocoder.geocode({ 'address': fullAddress}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            z = {
                name: address,
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
            };
            console.log(JSON.stringify(z));
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

google.maps.event.addDomListener(window, 'load', initialize);