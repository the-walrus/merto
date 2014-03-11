var geocoder;
var map;
var metroCoordinates = {};

var stations = [
    'Алма-Атинская',
    'Красногвардейская',
    'Домодедовская',
    'Орехово',
    'Царицыно',
    'Кантемировская',
    'Каширская',
    'Коломенская',
    'Автозаводская',
    'Павелецкая',
    'Новокузнецкая',
    'Театральная',
    'Тверская',
    'Маяковская',
    'Белорусская',
    'Динамо',
    'Аэропорт',
    'Сокол',
    'Войковская',
    'Водный стадион',
    'Речной вокзал'
];


function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(55.5, 38);
    var mapOptions = {
        zoom: 8,
        center: latlng
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


    var flightPlanCoordinates = [];

    allStations[0]['stations'].forEach(function (value) {
        flightPlanCoordinates.push(new google.maps.LatLng(value.lat, value.lng));
    });

    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: allStations[0]['color'],
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    flightPath.setMap(map);



    /*stations.forEach(function (value, index) {
        setTimeout(function () {
            codeAddress('Метро ' + value, value);
        }, index * 700);
    });*/
}

function codeAddress(fullAddress, address) {
    geocoder.geocode({ 'address': fullAddress}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            metroCoordinates[address] = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
            };
            console.log(JSON.stringify(metroCoordinates));
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

google.maps.event.addDomListener(window, 'load', initialize);