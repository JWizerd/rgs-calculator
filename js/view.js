var view = {
	renderTemplate: function(template) {
		$.get('./templates/' + template + '.html', function(data) {
			$('#mad-solar-calc').append(data)
		}).done(function(){
			$('#mad-solar-calc').fadeIn('slow')
		})
	},
	renderNextTemplate: function (nextTemp) {
		$this = this;
		$('#mad-solar-calc').fadeOut('slow', function(){
			$(this).children().remove()
			$this.renderTemplate(nextTemp)
		})
	}
}