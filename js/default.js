$(document).ready(function() {
	var controller = new pictographController();

	event.preventDefault();
	$("button").bind('click', function(){controller.loginToInstagram()});
});

function pictographController() {}

pictographController.prototype = {
	loginToInstagram: function() {
		window.open('https://instagram.com/oauth/authorize/?client_id=9e8cb302b04d4fd1be775c062799a962&redirect_uri=http://brittanymazza.com/pictograph/&response_type=token', '_self');
	}
}
