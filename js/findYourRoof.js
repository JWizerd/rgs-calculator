// google.maps.event.addDomListener(window, 'load', init_map);
var address;

function init_map(lat, lng) {
  var myOptions = {
    zoom:21,
    center:new google.maps.LatLng(lat, lng),
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };

  map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);

  marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(lat, lng)
  });

  infowindow = new google.maps.InfoWindow({
    content:'<strong></strong><br>' + address + '<br>'
  });

  google.maps.event.addListener(marker, 'click', function(){
    infowindow.open(map,marker);
  });

  infowindow.open(map,marker);
}

var Roof = {

	setAddress: function() {
		address = $('#solar_quote_basic_full_address').val();
		console.log(address)
	},

	generateMap: function(address){
		$.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ encodeURI(address) +'&key=AIzaSyAqFcYk1TD4uNYR4LjF1jRoRu1Pqr0npdA', function(data){
			console.log('Google Geolocator API Call successful.')
		})
		.done(function(data){
			init_map(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng)
		})
		.fail(function(data){
			console.log('Google Maps API request did resolve')
		})
	}
}
