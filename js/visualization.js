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
			  return (i+1) * (h / filters.length) - multiplier;  
			})
			.attr("x", function(d) {
			  return (countedFilters[d] * multiplier) + multiplier; 
			});
	}
}