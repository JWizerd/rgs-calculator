var serviceRate;

var utilPros = {

	render: function() {

		$.get('./data/Utility_Rate_Xlsx_Parser.php', function(data){

			data.forEach(function(provider) {

				if (provider.stateAbbrev === Cookies.get('stateAbbrev')) {
					$('#utility-providers').append(                
						'<div class="cta-circle-wrapper col-md-4 col-sm-3 col-xs-6">' +
			        '<button type="submit" onclick="serviceRate='+ provider.serviceRate +'"class="solar_quote_basic_utility submit-template" name="utility" value="' + provider.serviceRate + '">' +
			          '<div class="cta-square">' +
			            '<div class="cta-link">' +
			              '<div class="cta-link-hover"></div>' +
			              '<div>'+ provider.utilityVendor +'</div>' +
			            '</div><!-- .cta-link -->' +
			          '</div><!-- .cta-circle -->' +
			          '<label for="solar_quote_basic_utility_318" style="display:none;">'+ provider.utilityVendor +'</label>' +
			        '</button>' +
			      '</div><!-- .cta-circle-wrapper -->'
			    )
				}

			})

		})
	},

	persistData: function() {
		Cookies.set('serviceRate', serviceRate)
	}
}