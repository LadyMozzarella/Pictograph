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
	getImageInformation: function(imageId) {
		return $.ajax({
			type: 'GET',
			url: "https://api.instagram.com/v1/media/" + imageId + "?access_token=" + this.accessToken,
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
	},
	getFrequentFilter: function(countedFilters) {
		var count = 0;
		var filter = "";
		for( var index in countedFilters ) {
			if(countedFilters[index] > count) {
				count = countedFilters[index];
				filter = index;
			}
		}
		return filter;
	},
	getImagesIdsbyFilter: function(filter, imageFeed) {
		var imageIds = [];
		for(var i=0; i<imageFeed.length; i++) {
			if(imageFeed[i].filter == filter){
				imageIds.push(imageFeed[i].id);
			}
		}
		return imageIds;
	}
};

