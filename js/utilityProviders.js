var serviceRate;
var serviceCharge;

var utilPros = {

	render: function() {

		$.get('./data/Utility_Rate_Xlsx_Parser.php', function(data){

			data.forEach(function(provider) {

				if (provider.stateAbbrev === Cookies.get('stateAbbrev')) {
					$('#utility-providers').append(                
						'<div class="cta-circle-wrapper col-md-4 col-sm-3 col-xs-6">' +
			        '<button type="submit" data-servicerate="'+ provider.serviceRate +'" data-servicecharge="'+ provider.serviceCharge +'" onclick="serviceRate='+ provider.serviceRate +'; serviceCharge = '+ provider.serviceCharge +'"class="solar_quote_basic_utility submit-template" name="utility" value="' + provider.masterTariffId + '">' +
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

	save: function() {
		Cookies.set('serviceRate', serviceRate, { expires: view.expiration })
		Cookies.set('serviceCharge', serviceCharge, { expires: view.expiration })
	},

	average: function(attribute) {

		var $providers = $('.solar_quote_basic_utility'),
		    sum = 0,
		    len = $providers.length - 1

		$.each($providers, function(){ 
			if ($(this).val() !== 'other') {
				sum += parseFloat($(this).data(attribute))
			}
		})

		return sum / len

	}
}