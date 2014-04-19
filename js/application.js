$(document).ready(function() {
	var controller = new PictographController();
	var accessTokenHash = window.location.hash;
	
	controller.delegateSetup(accessTokenHash);
});

