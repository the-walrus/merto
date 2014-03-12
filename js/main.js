var map;

function initialize() {
    var center = {
        "lat": 45.752289,
        "lng": 37.60866299999998
    };

    var metroCenter = {
        "lat": 55.752289,
        "lng": 37.60866299999998
    };

    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(55.5, 38)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var latDelta = metroCenter.lat - center.lat;
    var lngDelta = metroCenter.lng - center.lng;


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
}

google.maps.event.addDomListener(window, 'load', initialize);