function PictographView() {
	this.visualization = new Visualization;
};

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
		$('.count').text(postCount);
	},
	displayError: function() {
		$('.content').html('');
		$('.content').append('Something went wrong. Sorry!');
	},
	chartFilterCount: function(filterCountHash, countedFilters) {
		this.visualization.createBarGraph(filterCountHash.filters, filterCountHash.count, countedFilters)
	},
	appendImage: function(url, username) {
		$('.photos').append('<div class="image"><img src="' + url + '">' + username + '</div>');
	},
	addFilterName: function(filter) {
		$('.photos').prepend('Images with <span class="filter_header">' + filter + '</span> filter:')
	}
};
