var zipcodeForm = {
	zipcode: null,
	that: this,

	whitelist: function() {
		var arr = []
		$.get('./data/Utility_Rate_Xlsx_Parser.php', function(data) {
				data.forEach(function(item){
					arr.push(item.stateAbbrev)
				})
			})
		return arr
	},

	validate: function() {

		this.zipcode = $('#solar_quote_basic_1_zip').val()

		if (this.zipcode.length === 5) {
			this.isValidZipCode()
		} else {
			errorMsg('Please enter valid zipcode')
		}

	},

	isValidZipCode: function() {
		var whitelist = this.whitelist();
		var endpoint = 'http://www.zippopotam.us/us/' + this.zipcode

		$.get(endpoint, function(data) {
			document.cookie = "zipcode=" + data['post code']

			console.log(whitelist.includes(data['places'][0]['state abbreviation']))
		})
		.fail(function(){
			errorMsg('Please enter valid zipcode')
		})
		.done(function() {
			$('#solar_quote_basic_1').data('valid', true)
			view.renderNextTemplate('monthlyUtilities');
		})

	}
}