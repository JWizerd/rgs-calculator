var placeSearch, 
    autocomplete, 
    address, 
    latitude, 
    longitude;

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('solar_quote_basic_full_address')),
    { types: ['geocode'] }
  );

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // create a new area radius based from geolocator lat lng for faster accuracy and autocomplete
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });

      autocomplete.setBounds(circle.getBounds());

    });
  }
}

function init_map(lat, lng) {
  var myOptions = {
    zoom:21,
    center:new google.maps.LatLng(lat, lng),
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };

  map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);

  marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(lat, lng),
    draggable: true
  });

  // if marker isn't moved default to coords grabbed from geolocation api req
  latitude = lat
  longitude = lng

  google.maps.event.addListener(marker, 'dragend', function(event){
    latitude = event.latLng.lat();
    longitude = event.latLng.lng();
  });
}

var Roof = {

	setAddress: function() {
		address = $('#solar_quote_basic_full_address').val();
	},

  validate: function() {
    // if google maps auto complete doesn't return a location product error message
    if (undefined === autocomplete.getPlace()) {
      errorMsg('Your Address is invalid. Please enter a valid address')
    } else {
      view.renderNextTemplate('showRoofMap', this.generateMap(address))      
    }
  },

	generateMap: function(address){
		$.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ encodeURI(address) +'&key=AIzaSyAqFcYk1TD4uNYR4LjF1jRoRu1Pqr0npdA', function(data){
			console.log('Google Geolocator API Call successful.')
		})
    .done(function(data){
      var lat = data.results[0].geometry.location.lat
      var lng = data.results[0].geometry.location.lng
      setTimeout(function(){
        init_map(lat, lng)
        $('#gmap-address').html('<strong>Displaying:</strong> ' + address)
      }, 1000)
    })
		.fail(function(data){
			console.log('Google Maps API request did resolve')
		})
	},

  save: function() {
    Cookies.set('address', address, { expires: view.expiration })
    Cookies.set('longitude', longitude, { expires: view.expiration })
    Cookies.set('latitude', latitude, { expires: view.expiration })
    Cookies.set('roofImage', 'https://maps.googleapis.com/maps/api/staticmap?center=' + latitude +',' + longitude + '&zoom=20&size=600x600&maptype=satellite&key=AIzaSyAUKq3IavSkzBPuJMHVTiEpyUo_m8PwHaM', { expires: view.expiration })
  }
}