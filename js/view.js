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

	renderTemplate: function(template) {
		$.get('./templates/' + template + '.html', function(data) {
			$('#mad-solar-calc').append(data)
		}).done(function(){
			$('#mad-solar-calc').fadeIn('slow')
		})
	},

	renderNextTemplate: function (nextTemp) {
		$this = this;
		this.stageTracker()
		$('#mad-solar-calc').fadeOut('slow', function(){
			$(this).children().remove()
			$this.renderTemplate(nextTemp)
		})
	}
}