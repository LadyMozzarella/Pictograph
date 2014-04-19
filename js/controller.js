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
			var countedFilters = that.igdata.countFilters(data.data);

			that.view.updateContent(String(data.data.length));
			that.view.chartFilterCount(that.igdata.separateFilterData(countedFilters), countedFilters);
			that.populateImages(countedFilters, data.data);
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
	},
	populateImages: function(countedFilters, imageFeed) {
		var popularFilter = this.igdata.getFrequentFilter(countedFilters);
		var imageIds = this.igdata.getImagesIdsbyFilter(popularFilter, imageFeed);
		var that = this;

		this.view.addFilterName(popularFilter);

		for(var i=0; i<imageIds.length; i++) {
				that.igdata.getImageInformation(imageIds[i]).done(function(data) {
				that.view.appendImage(data.data.images.standard_resolution.url, data.data.user.username);
			}).fail(function(){
				that.view.displayError();
			});
		}
	}
};