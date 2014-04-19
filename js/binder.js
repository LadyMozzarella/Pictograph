function Binder(controller) {
	this.controller = controller;
};

Binder.prototype = {
	instagramLogin: function() {
		var that = this;
		$('button').bind('click', function() {
			event.preventDefault();
			that.controller.loginToInstagram()
		});
	}
};