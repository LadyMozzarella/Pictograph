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
		$('button').bind('click', function() {
			event.preventDefault();
			that.controller.loginToInstagram()
		});
	}
};

function PictographController() {
	this.view = new PictographView;
	this.bind = new Binder(this);
	this.igdata = new InstagramDataRequest;
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
		this.populateUserInfo();
		this.populateRecentFeed();
		this.view.showContent();
	},
	populateUserInfo: function() {
		var that = this;
		this.igdata.getUserInfo(this.accessToken).done(function(data) {
      that.view.updateUsername(data.data.username);
      that.userId = data.data.userId;
    }).fail(function(){
    	that.view.displayError();
    });
	},
	populateRecentFeed: function(){
		var that = this;
		this.igdata.getRecentFeed().done(function(data) {
      that.view.updateContent(data.data.length);
    }).fail(function(){
    	that.view.displayError();
    });
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
	updateUsername: function(username) {
		$('.username').text(username);
	},
	updateContent: function(postCount) {
		$('.count').text(String(postCount));
	},
	displayError: function() {
		$('.content').html('');
		$('.content').append('Something went wrong. Sorry!');
	}
};

function InstagramDataRequest() {};

InstagramDataRequest.prototype = {
	getUserInfo: function(accessToken) {
		this.accessToken = accessToken;
		return $.ajax({
			type: 'GET',
			url: 'https://api.instagram.com/v1/users/self?access_token=' + this.accessToken,
			dataType: 'jsonp',
			context: this
		})
	},
	getRecentFeed: function() {
		return $.ajax({
			type: 'GET',
			data: { count: 29 },
			url: 'https://api.instagram.com/v1/users/self/feed?access_token=' + this.accessToken,
			dataType: 'jsonp',
			context: this
		})
	}
};







