var monthlyUtils = {
	showValue:  function (val) {
		$('#solar_quote_basic_1_utility_cost_label').html(val); 
  },
  
  save: function() {
  	Cookies.set('monthlyUtilityRate', $('#solar_quote_basic_1_utility_cost').val())
  }
}