function Binder(controller) {
	this.controller = controller;
};

Binder.prototype = {
	instagramLogin: function() {
		var that = this;
		$('button').on('click', function(e) {
			e.originalEvent.preventDefault();
			that.controller.loginToInstagram()
		});
	}
};