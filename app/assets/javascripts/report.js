// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

function pie_chart(data, labels, links, total, class_name) {

// pie dimensions
  var width = 500,
  	  height = 350,
  	  outerRadius = 120,
  	  innerRadius = 40,
  	  color = d3.scale.category20(),
  	  pie = d3.layout.pie().sort(null),
  	  arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);

// main svg container
  var vis = d3.select(class_name).append("svg")
  	.attr("width", width)
  	.attr("height", height);

// GROUP FOR CENTER TEXT  
var center_group = vis.append("g")
  .attr("class", "center_group")
  .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")");
  
//GROUP FOR LABELS
var label_group = vis.append("g")
  .attr("class", "label_group")
  .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")");
  
//WHITE CIRCLE BEHIND LABELS
var whiteCircle = center_group.append("circle")
  .attr("fill", "white")
  .attr("r", innerRadius);
  
// "TOTAL" label
var totalLabel = center_group.append("text")
  .attr("class", "pie-chart-total-label")
  .attr("dy", -10)
  .attr("text-anchor", "middle") 
  .text("TOTAL");

//Total dollar amount
var totalValue = center_group.append("text")
  .attr("class", "pie-chart-total-amount")
  .attr("dy", 10)
  .attr("text-anchor", "middle") 
  .text(total);

// Create arcs
var arcs = vis.selectAll("g.arc")
  .data(pie(data))
.enter().append("g")
  .attr("class", "arc")
  //.attr("onmouseover","evt.target.setAttribute('opacity', '0.5');")
  //.attr("onmouseout","evt.target.setAttribute('opacity', '1');")
  .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")");

// draw and fill each arc
arcs.append("path")
  .attr("fill", function(d, i) { return color(i); })
  .attr("d", arc);

// draw tic marks for each group
   lines = label_group.selectAll("line").data(pie(data));
    lines.enter().append("svg:line")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", -outerRadius-3)
      .attr("y2", -outerRadius-8)
      .attr("stroke", "gray")
      .attr("transform", function(d) {
        return "rotate(" + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ")";
      });

// add text for each group
	arcs.append("text")
	  .attr("transform", function(d) {
        var c = arc.centroid(d);
        return "translate(" + c[0]*1.7 +"," + c[1]*1.7 + ")";
       })
      .attr("dy", function(d){
        if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
          return 5;
        } else {
          return -10;
        }
      })
  	  .attr("class", "pie-chart-data-amount")
  	  .attr("text-anchor", function(d){
        if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
          return "beginning";
        } else {
          return "end";
        }})
  	  .attr("display", function(d) { return d.value > 1 ? null : "none"; })
  	  .text(function(d, i) { return "$" + d.value.toFixed(2); });

// add text for each group
	arcs.append("text")
	  .attr("transform", function(d) {
        var c = arc.centroid(d);
        return "translate(" + c[0]*1.7 +"," + c[1]*1.7 + ")";
       })
      .attr("dy", function(d){
        if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
          return 20;
        } else {
          return 5;
        }
      })
  	  .attr("class", "pie-chart-data-label")
  	  .attr("text-anchor", function(d){
        if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
          return "beginning";
        } else {
          return "end";
        }})
  	  .attr("display", function(d) { return d.value > 1 ? null : "none"; })
  	  .text(function(d, i) { return labels[i]; });
}

function bar_chart(data, class_name) {

// bar chart dimensions
  var width = 1000,
  	  height = 500,
  	  max_bar_height = 400,
  	  bar_width = 35,
  	  bar_gap = 5;
  	  bar_offset = 35;
  	  bar_x_margin = 50;
  	  bar_y_margin = 50;
  	  
// create scale for y 
  var y_scale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) {return Math.max(d[1], d[2]) })])
    .range([max_bar_height, 0]);

// create y axis
  var y_axis = d3.svg.axis()
  	.scale(y_scale)
  	.orient("left")
  	.ticks(5);

// main svg container
  var vis = d3.select(class_name).append("svg")
  	.attr("width", width)
  	.attr("height", height);
  	
// container for right bars
  var right_group = vis.append("g")
  	.attr("class", "right")
   	.attr("transform", "translate(" + (bar_x_margin + bar_offset) + ", " + bar_y_margin + ")");

// groups for right bars with their text
  var right_bars = right_group.selectAll("g")
   	.data(data)
   	.enter().append("g")
   	  .attr("transform", function (d,i) { return "translate(" + i*(bar_width + bar_offset + bar_gap) + ", 0)"; });

// group for left bars
  var left_group = vis.append("g")
  	.attr("class", "left")
  	.attr("transform", "translate(" + bar_x_margin + ", " + bar_y_margin + ")");

// groups for left bars with their text
  var left_bars = left_group.selectAll("g")
    .data(data)
    .enter().append("g")
   	  .attr("transform", function (d,i) { return "translate(" + i*(bar_width + bar_offset + bar_gap) + ", 0)"; });
  	

// Create left bars
left_bars.append("rect")
  .attr("width", bar_width)
  .attr("height", 0)
  .attr("y", max_bar_height)
  .transition().delay(function (d,i){ return 0;})
  .duration(300)
  .attr("height", function(d) {return max_bar_height-y_scale(d[1])})
  .attr("y", function(d) { return y_scale(d[1]) } );

// Create right bars
right_bars.append("rect")
  .attr("width", bar_width)
  .attr("height", 0)
  .attr("y", max_bar_height)
  .transition().delay(function (d,i){ return 0;})
  .duration(300)
  .attr("height", function(d) {return max_bar_height-y_scale(d[2])})
  .attr("y", function(d) { return y_scale(d[2]) } );
 
// add text to left bars
left_bars.append("text")
  .attr("x", bar_width - 2)
  .attr("y", function(d) { return y_scale(d[1]) + 10 })
  .attr("text-anchor", "end")
  .attr("fill", "white")
  .text(function(d) { if (d[1] > 0) return "$" + d[1].toFixed(0); });


// add text to right bars
right_bars.append("text")
  .attr("x", bar_width - 2)
  .attr("y", function(d) { return y_scale(d[2]) + 10 })
  .attr("text-anchor", "end")
  .attr("fill", "white")
  .text(function(d) { if (d[2] > 0) return "$" + d[2].toFixed(0) });

// add labels to x axis
right_bars.append("text")
  .attr("class", "bar-chart-x-label")
  .attr("text-anchor", "middle") 
  .attr("y", max_bar_height+15)
  .text(function(d) {return d[0]; });
  
// add y axis
vis.append("g")
  .call(y_axis)
  .attr("transform", "translate(" + bar_x_margin + ", " + bar_y_margin + ")")
  .attr("class", "axis");

// add line for x axis
vis.append("path")
  .attr("class", "axis")
  .attr("d", "M " + bar_x_margin + " " + (bar_y_margin + max_bar_height) + " H " + (bar_x_margin + 12*(bar_width + bar_offset) + 11*bar_gap));  
}
