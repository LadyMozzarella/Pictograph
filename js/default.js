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
			that.view.updateContent(String(data.data.length));
			var countedFilters = that.igdata.countFilters(data.data);
			that.view.chartFilterCount(that.igdata.separateFilterData(countedFilters), countedFilters);
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
	},
	countFilters: function(updates) {
		var updates = updates;
		var filterCount = {};
		for (var i = 0; i < updates.length; i++ ) {
			if( filterCount[updates[i].filter] == undefined ) {
				filterCount[updates[i].filter] = 1;
			}
			else {
				filterCount[updates[i].filter] = filterCount[updates[i].filter] + 1 ;
			}
		}
		return filterCount;
	},
	separateFilterData: function(filterCount) {
		var filters = [];
		var count = [];

		for( var index in filterCount ) {
			filters.push(index);
			count.push(filterCount[index])
		}
		return {filters: filters, count: count};
	}
};

function Visualization() {};

Visualization.prototype = {
	createBarGraph: function(filters, count, countedFilters) {
		var multiplier = 19;
		var w = 26 * multiplier;
		var h = 500;

		//Creates bar graph with d3.js library
		var svg = d3.select(".bar_graph")
		  .append("svg")
		  .attr("width", w)
		  .attr("height", h);

		this.createRectangles(count, multiplier, w, svg);
		this.addText(filters, multiplier, h, svg, countedFilters);
	},
	createRectangles: function(count, multiplier, w, svg) {
		var barPadding = 1;

		svg.selectAll("rect")
			.data(count)
			.enter()
			.append("rect")
			.attr("x",  function(d) {
		    return 0; 
			})
			.attr("y", function(d, i) {
				return i * (w / count.length); 
			})
			.attr("width", function(d) {
				return d * multiplier;
			})
			.attr("height", w / count.length - barPadding)
			.attr("fill", "red");
	},
	addText: function(filters, multiplier, h, svg, countedFilters) {
		svg.selectAll("text")
			.data(filters)
			.enter()
			.append("text")
			.attr("fill", "white")
			.text(function(d) {
				return d + ':  ' + String(countedFilters[String(d)]);
			})
			.attr("y", function(d, i) {
			  return i * (h / filters.length) + multiplier;  
			})
			.attr("x", function(d) {
			  return (countedFilters[d] * multiplier) + multiplier; 
			});
	}
}







