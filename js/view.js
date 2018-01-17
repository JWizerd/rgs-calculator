var view = {
	stage: null,
	stageTracker: function() {
		this.stageSetter()

	},

	stageSetter: function(){
		// keep track of what stage a user is on in calculator
		if (this.stage === null) {
			Cookies.set('stage', 1)
			this.stage = 1
		} else {
			Cookies.set('stage', this.stage + 1)
		}
	},

	renderStage: function() {},

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
		this.stageTracker()
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