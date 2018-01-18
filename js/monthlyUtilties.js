var monthlyUtils = {
	showValue:  function (val) {
		$('#solar_quote_basic_1_utility_cost_label input').val(val); 
  },
  
  save: function() {
  	Cookies.set('monthlyUtilityRate', $('#solar_quote_basic_1_utility_cost_label input').val(), { expires: view.expiration })
  }
}