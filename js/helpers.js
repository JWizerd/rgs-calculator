function errorMsg(error) {
	if ($('#warning-message').length > 0) {
		$('#warning-message').text(error)
	} else {
		$('form').before('<p id="warning-message" style="color:red; text-align: center;">' + error +'</p>')	
	}
}