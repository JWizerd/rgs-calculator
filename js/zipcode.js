var zipcodeForm = {
	zipcode: null,
	validate: function() {
		this.zipcode = $('#solar_quote_basic_1_zip').val()
		if (this.zipcode.length === 5) {
			this.isValidZipCode()
		} else {
			errorMsg('Please enter valid zipcode')
		}
	},
	isValidZipCode: function() {
		var endpoint = 'http://www.zippopotam.us/us/' + this.zipcode
		$.get(endpoint, function(data) {
			document.cookie = "zipcode=" + data['post code']
		})
		.fail(function(){
			errorMsg('Please enter valid zipcode')
		}).done(function() {
			$('#solar_quote_basic_1').data('valid', true)
			view.renderNextTemplate('monthlyUtilities');
		})
	}
}