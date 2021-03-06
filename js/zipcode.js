var mapsBg;

var zipcodeForm = {
	zipcode: null,

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
		var that = this
		var whitelist = this.whitelist()
		var endpoint = 'http://www.zippopotam.us/us/' + this.zipcode
		$.get(endpoint, function(data) {
			
		})
		.fail(function(){
			errorMsg('Please enter valid zipcode')
		})
		.done(function(data){
			var stateAbbrev = data['places'][0]['state abbreviation']
			if (whitelist.includes(stateAbbrev)) {
				Cookies.set('zipcode', data['post code'], { expires: view.expiration })
				Cookies.set('stateAbbrev', stateAbbrev, { expires: view.expiration })
				$('#solar_quote_basic_1').data('valid', true)
				view.renderNextTemplate('monthlyUtilities')
			} else {
				errorMsg('Unfortunately we do not service your state.')
			}
		})
	}
}