$(document).ready(function() {
	var photoTemplate = $.trim($('#photo_template').html());
	var controller = new PictographController(photoTemplate);
	var accessTokenHash = window.location.hash;
	
	controller.delegateSetup(accessTokenHash);
});

