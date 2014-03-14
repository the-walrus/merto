var map;
var geocoder;

function Map() {
    geocoder = new google.maps.Geocoder();

    window.center = {
        "lat": 55.752289,
        "lng": 37.60866299999998
    };

    window.metroCenter = {
        "lat": 55.752289,
        "lng": 37.60866299999998
    };

    var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(55.752289, 37.60866299999998)
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    console.log(this);
    drawMetro();

}

function drawMetro () {
    console.log(123);
    var latDelta = window.metroCenter.lat - window.center.lat;
    var lngDelta = window.metroCenter.lng - window.center.lng;

    allStations.forEach(function (value) {
        var flightPlanCoordinates = [];
        value['stations'].forEach(function (value) {
            flightPlanCoordinates.push(new google.maps.LatLng(
                value.lat + latDelta,
                value.lng + lngDelta
            ));
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
};


function codeAddress() {
    var address = document.getElementById('address').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            window.metroCenter = {
                "lat": results[0].geometry.location.lat(),
                "lng": results[0].geometry.location.lng()
            };
            drawMetro();
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

google.maps.event.addDomListener(window, 'load', Map);