function initialize() {
  var map;
  var myOptions = {
      zoom: 13,
      center: new google.maps.LatLng(-23.42100,-51.93306),
      mapTypeId: 'terrain'
  };
  var image = 'https://raw.githubusercontent.com/renanmpimentel/tccc-map/gh-pages/assets/images/bus.png';
  var imageGeolocation = 'https://raw.githubusercontent.com/renanmpimentel/tccc-map/gh-pages/assets/images/geolocation.png';

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var geolocationWindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Você está aqui!'
      });

      var geolocationMarker = new google.maps.Marker({
          position: pos,
          map: map,
          icon: imageGeolocation
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }

  map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);

XHR.get({
  url: 'http://api-tccc.herokuapp.com/'
}, function(addresses){

  addresses.forEach(function(each) {
    var link = each.link.replace('http://maps.google.com.br/maps?q=', '');
          XHR.get({
              url:'http://maps.googleapis.com/maps/api/geocode/json?address='+link+'&sensor=false'
          }, function(data) {
            var p = data.results[0].geometry.location
            var latlng = new google.maps.LatLng(p.lat, p.lng);

            var infowindow = new google.maps.InfoWindow({
              content: '<h3>' + each.local + '</h3><p>' + each.address + '<br>' + each.phone + '</p>' ,
              title: "Text"
            });

            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                icon: image
            });

            google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map,marker);
            });
      });
    });
  });

}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var geolocationWindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);

