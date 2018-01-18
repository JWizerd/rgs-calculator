var view = {
	stageTracker: function() {
		if (Cookies.get('stage') === undefined) {
			Cookies.set('stage', 'mounted')
		}

		switch	(Cookies.get('stage')) {
			case 'mounted':
				this.renderTemplate('mounted')
				break;
			case 'monthlyUtilities':
				this.renderTemplate('monthlyUtilities')
				break;
			case 'utilityProviders':
				view.renderTemplate('utilityProviders', utilPros.render)
				break;
			case 'findYourRoof':
			  this.renderTemplate('findYourRoof')
			  break;
			case 'showRoofMap': 
				// send user on select map location back to re-enter their address for gmaps
				this.renderTemplate('findYourRoof')
				break;
			case 'yourSystemEstimate': 
				this.renderTemplate('yourSystemEstimate')
				break;
		}
	},

	renderTemplate: function(template, fn = null) {

		$.get('./templates/' + template + '.html', function(data) {

			$('#mad-solar-calc').append(data)

		}).done(function(){

			$('#mad-solar-calc').fadeIn('slow', function(){

				if (typeof fn == 'function') {
					fn()
				}

			})

		})
	},

	renderNextTemplate: function (nextTemp, fn = null) {
		$this = this;

		// increment stage cookies for stage tracking 
		Cookies.set('stage', nextTemp, { expires: 1 })
		$submit = $('.submit-template')

		$('#mad-solar-calc').fadeOut('slow', function(){

			$(this).children().remove()
			// stop render template jax call from firing more than once
			if (!$submit.data('pressed')) {

				$this.renderTemplate(nextTemp, fn)
				$submit.data('pressed', true)

			}

		})
	},

	/**
	 * render background map taken from google maps on load based from computers geolocation coords
	**/
	setMapBg: function() {
		if (navigator.geolocation) {
		  navigator.geolocation.getCurrentPosition(function(position) {
		    var geolocation = {
		      lat: position.coords.latitude,
		      lng: position.coords.longitude
		    };
		    var bgMap = 'https://maps.googleapis.com/maps/api/staticmap?format=jpg&scale=2&size=640x350&key=AIzaSyAUKq3IavSkzBPuJMHVTiEpyUo_m8PwHaM&center='+ geolocation.lat + ',' + geolocation.lng + '&style=element%3Alabels%7Clightness%3A50&maptype=satellite&zoom=13';
		  $('#mad-solar-calc').css(
			  {
			  	'background': 'linear-gradient(rgba(1, 35, 70,.8), rgba(1, 35, 70,.8)), url(' + bgMap + ')'
			  })
      })
    }
	}

}