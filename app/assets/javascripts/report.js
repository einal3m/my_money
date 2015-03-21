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
total = (data.reduce(function(a, b){return a+b;})/100.0).toFixed(2);
var totalValue = center_group.append("text")
  .attr("class", "pie-chart-total-amount")
  .attr("dy", 10)
  .attr("text-anchor", "middle") 
  .text('$' + total);

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
  	  .text(function(d, i) { return "$" + (d.value/100.0).toFixed(2); });

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

//
// bar_chart
//
// creates a bar chart from the data array and places the chart in the container with
// the specified class name
//
// data is of the format:
//
// [[x, y1, y2...], [x, y1, y2...] ...]
//
function bar_chart(data, class_name) {

  // calculate how many data series, and how many bars for each series
  var bar_count = data.length;
  var data_count = data[0].length - 1;

  // then work out bar chart dimensions
  var width = 1000,
      height = 500,
      max_bar_height = 400,
      bar_gap = 5,
      bar_offset = 35,
      bar_x_margin = 50,
      bar_y_margin = 50;
  var bar_width = (75.0 - (data_count-1)*bar_gap)/data_count 
      
  // create scale for y 
  var y_scale = d3.scale.linear()
    .domain([

          d3.min(data, function(d) {
            var min = 0; 
            for (var i = 1; i < d.length; i++) if (d[i] < min) min = d[i]; 
            return min/100.0; }),

          d3.max(data, function(d) {
            var max = d[1]; 
            for (var i = 2; i < d.length; i++) if (d[i] > max) max = d[i]; 
            return max/100.0; })])
    .range([max_bar_height, 0]);
console.log(y_scale);

  // create scale for x labels
  var x_labels = []; 
  for (var i = 0; i< data.length; i++) x_labels.push(data[i][0]); 

  var x_scale = d3.scale.ordinal()
    .domain(x_labels)
    .rangeRoundBands([0, 75*bar_count + bar_gap*(bar_count)]);

  // create y axis
  var y_axis = d3.svg.axis()
    .scale(y_scale)
    .orient("left")
    .ticks(5);

  // create x axis
  var xAxis = d3.svg.axis()
    .scale(x_scale)
    .orient("bottom");

  // main svg container
  var vis = d3.select(class_name).append("svg")
    .attr("width", width)
    .attr("height", height);
    
  // for each set of x data, create bars
  for (var x=1; x<=data_count; x++){

    // container for bars
    var bar_group = vis.append("g")
      .attr("class", "x" + x)
      .attr("transform", "translate(" + (bar_x_margin + (x-1)*bar_width + bar_gap) + ", " + bar_y_margin + ")");

    // groups for bars with their text
    var bars = bar_group.selectAll("g")
      .data(data)
      .enter().append("g")
        .attr("transform", function (d,i) { return "translate(" + i*(75  + bar_gap) + ", 0)"; });

    // Create bars
    bars.append("rect")
      .attr("width", bar_width)
      .attr("height", function(d) {return max_bar_height-y_scale(d[x]/100.0)})
      .attr("y", function(d) { return y_scale(d[x]/100.0) } );

     
    // add text to bars
    bars.append("text")
      .attr("x", bar_width - 2)
      .attr("y", function(d) { return y_scale(d[x]/100.0) + 10 })
      .attr("text-anchor", "end")
      .attr("fill", "white")
      .text(function(d) { if (d[x] > 0) return "$" + (d[x]/100.0).toFixed(0); });

  }

  // add y axis
  vis.append("g")
    .call(y_axis)
    .attr("transform", "translate(" + bar_x_margin + ", " + bar_y_margin + ")")
    .attr("class", "y axis");

  // add x axis
  vis.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + bar_x_margin + "," + (max_bar_height + bar_y_margin) + ")")
      .call(xAxis);

}

//
// line_chart
//
// creates a line chart from the data array and places the chart in the container with
// the specified class_name
//
// data is of the format:
//
// [[x1, y1], [x1, y1] ...]
//
function line_chart(data, class_name) {
  // then work out bar chart dimensions
  var chart_width = 1000,
      chart_height = 500;


  // Set the dimensions of the canvas / graph
  var margin = {top: 30, right: 20, bottom: 30, left: 50},
      width = chart_width - margin.left - margin.right,
      height = chart_height - margin.top - margin.bottom;

  // Set the ranges
  var x_scale = d3.time.scale()
    .range([0, width])
    .domain(d3.extent(data, function(d) { return new Date(d[0]); }));

  var y_scale = d3.scale.linear()
    .range([height, 0])
    .domain(d3.extent(data, function(d) { return d[1]/100.0; })); 

  // Define the axes
  var xAxis = d3.svg.axis().scale(x_scale)
      .orient("bottom").ticks(5);

  var yAxis = d3.svg.axis().scale(y_scale)
      .orient("left").ticks(5);

  // Define the line
  var line = d3.svg.line()
      .x(function(d) { return x_scale(new Date(d[0])); })
      .y(function(d) { return y_scale(d[1]/100.0); })
      .interpolate('step-after');

  // Adds the svg canvas
  var svg = d3.select(class_name)
      .append("svg")
          .attr("width", chart_width)
          .attr("height", chart_height)
      .append("g")
          .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")");

  // add the lines
  var lines = svg.append("g")
  lines.append('path')
    .attr('d', line(data))
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

  // Add the X Axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  // Add the Y Axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

}
    
