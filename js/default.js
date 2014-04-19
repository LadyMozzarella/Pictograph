$(document).ready(function() {
	var controller = new PictographController();
  var accessTokenHash = window.location.hash;
	
	controller.delegateSetup(accessTokenHash);
});

function Binder(controller) {
	this.controller = controller;
};

Binder.prototype = {
	instagramLogin: function() {
		var that = this;
		$("button").bind('click', function() {
			event.preventDefault();
			that.controller.loginToInstagram()
		});
	}
};

function PictographController() {
	this.view = new PictographView();
	this.bind = new Binder(this);
};

PictographController.prototype = {
	loginToInstagram: function() {
		window.open('https://instagram.com/oauth/authorize/?client_id=9e8cb302b04d4fd1be775c062799a962&redirect_uri=http://brittanymazza.com/pictograph/&response_type=token', '_self');
	},
	setupInstagramLogin: function() {
		this.view.showLoginButton();
		this.bind.instagramLogin();
	},
	populateInstagramData: function() {
		this.view.showContent();
	},
	delegateSetup: function(accessTokenHash) {
		if (accessTokenHash.length == 0) {
			this.setupInstagramLogin();
		} 
		else {
			this.accessToken = window.location.hash.split('=')[1];
			this.populateInstagramData();
		};
	}
};

function PictographView() {};

PictographView.prototype = {
	showLoginButton: function() {
		$('.login_btn').show();
		$('.content').hide();
	},
	showContent: function() {
		$('.login_btn').hide();
		$('.content').show();
	},
};
