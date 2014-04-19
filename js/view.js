function PictographView() {
	this.visualization = new Visualization;
};

PictographView.prototype = {
	showLoginButton: function() {
		$('.login_btn').show();
		$('.content').hide();
	},
	showContent: function() {
		$('.login_btn').remove();
		$('.content').show();
	},
	updateUsername: function(username) {
		$('.username').text(username);
	},
	updateContent: function(postCount) {
		$('.count').text(postCount);
	},
	displayError: function() {
		$('.content').html('');
		$('.content').append('Something went wrong. Sorry!');
	},
	chartFilterCount: function(filterCountHash, countedFilters) {
		this.visualization.createBarGraph(filterCountHash.filters, filterCountHash.count, countedFilters)
	},
	appendImage: function(url, username, photoTemplate) {
		$('.photos').append(this.compileImage(url, username, photoTemplate));
	},
	addFilterName: function(filter) {
		$('.filter_header').text(filter);
	},
	compileImage: function(url, username, photoTemplate) {
		var $photo = $(photoTemplate);

		$photo.find('h3').text(username);
		$photo.find('img').attr('src', url);
		$photo.css("display", "inline");

		return $photo;
	}
};
