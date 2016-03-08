import d3 from 'd3';

export default function lineChart(seriesData, id, options, callbacks) {

  let width = options.width || 1000;
  let height = options.height || 500;

  let dim = {
    noOfSeries: seriesData.length,
    topMargin: 20,
    leftMargin: 80,
    xAxisHeight: 30
  };

  dim.chartHeight = height - dim.topMargin - dim.xAxisHeight;
  dim.chartWidth = width - dim.leftMargin;

  var vis = d3.select(id).append('svg')
    .attr('width', width)
    .attr('height', height);

  let [xScale, yScale] = createScales(seriesData, dim, callbacks);

  createYAxis(vis, yScale, dim, callbacks);
  createXAxis(vis, xScale, dim, callbacks);
  createLines(vis, xScale, yScale, seriesData, dim);

  createHoverCircles(vis, seriesData, xScale, yScale, dim, callbacks);
  create0Axis(vis, yScale, dim);
}

function convertDate(dateString) {
  let newDate = new Date(dateString);
  newDate.setHours(0);
  return newDate;
}

function createScales(seriesData, dim, callbacks) {

  var xScale = d3.time.scale()
    .domain([
      d3.min(seriesData, series => d3.min(series.data, data => data[0])),
      d3.max(seriesData, series => d3.max(series.data, data => data[0]))])
    .range([0, dim.chartWidth]);

  var yScale = d3.scale.linear()
    .domain([
      d3.min(seriesData, series => d3.min(series.data, data => data[1])),
      d3.max(seriesData, series => d3.max(series.data, data => data[1]))])
    .range([dim.chartHeight, 0]).nice();

  return [xScale, yScale];
}

function createYAxis(vis, yScale, dim, callbacks) {

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('right')
    .tickSize(dim.chartWidth)
    .ticks(10)
    .tickFormat(value => callbacks.formatYLabels(value));

  let yAxisG = vis.append('g')
    .call(yAxis)
    .attr('class', 'y-axis')
    .attr('transform', 'translate(' + dim.leftMargin + ', ' + dim.topMargin + ')');

  yAxisG.selectAll('path.y-axis, .y-axis line, .y-axis path')
    .style({fill: 'none', 'stroke-width': '1px', stroke: '#ddd', 'shape-rendering': 'crispEdges'});

  yAxisG.selectAll('text')
    .attr('x', -10)
    .style('text-anchor', 'end');
}

function createXAxis(vis, xScale, dim, callbacks) {

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .tickSize(dim.chartHeight)
    .ticks(8)
    .orient('top')
    .tickFormat(value => callbacks.formatXLabels(value));

  let xAxisG = vis.append('g')
    .attr('class', 'x-axis')
    .attr('transform', 'translate(' + dim.leftMargin + ',' + (dim.topMargin + dim.chartHeight) + ')')
    .call(xAxis);

  xAxisG.selectAll('path.x-axis, .x-axis line, .x-axis path')
    .style({fill: 'none', 'stroke-width': '1px', stroke: '#ddd', 'shape-rendering': 'crispEdges'});

  xAxisG.selectAll('text')
    .attr('y', 20);
}

function createLines(vis, xScale, yScale, seriesData, dim) {

  let d3Line = d3.svg.line()
    .x(data => xScale(data[0]))
    .y(data => yScale(data[1]))
    .interpolate('step-after');

  seriesData.forEach((series, seriesIndex) => {
    vis.append("g")
      .attr('class', `series${seriesIndex}`)
      .append('path')
      .attr('d', d3Line(series.data))
      .attr('stroke', series.backgroundColour)
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('transform', 'translate(' + dim.leftMargin + ',' + dim.topMargin + ')');
  });
}

function createHoverCircles(vis, seriesData, xScale, yScale, dim, callbacks) {
  let focus = vis.append("g")
    .attr("class", "focus")
    .attr('transform', 'translate(' + dim.leftMargin + ', ' + dim.topMargin + ')')
    .style("display", "none");

  let focusCircles = seriesData.map(series => {
    let group = focus.append('g');

    group.append('circle')
      .attr('r', 6)
      .style({stroke: series.backgroundColour, fill: 'white', 'stroke-width': '2'});

    group.append('circle')
      .attr('r', 3.5)
      .style({fill: series.backgroundColour});

    return group;
  });

  vis.append('rect')
    .attr('class', 'overlay')
    .attr('width', dim.chartWidth)
    .attr('height', dim.chartHeight)
    .attr('transform', 'translate(' + dim.leftMargin + ', ' + dim.topMargin + ')')
    .style({fill: 'none', 'pointer-events': 'all'})
    .on('mouseover', () => focus.style('display', null))
    .on('mouseout', hideCircles)
    .on('mousemove', moveCircles);

  let yFor = (date, series) => {
    let points = series.data.filter(data => date >= data[0]);
    if (points.length > 0) {
      return points.slice(-1)[0][1];
    } else {
      return;
    }
  };

  let roundedDate = (date) => {
    let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (date.getHours() > 12) {
      newDate.setDate(newDate.getDate()+1);
    }
    return newDate;
  };

  function moveCircles() {
    let date = roundedDate(xScale.invert(d3.mouse(this)[0]));

    let tooltipData = {
      periodLabel: callbacks.formatXLabels(date),
      seriesLabel: seriesData.map(series => series.name),
      colours: seriesData.map(series => series.backgroundColour),
      tooltipPosition: xScale(date) > dim.chartWidth/2 ? 'left': 'right'
    };
    let values = [];

    seriesData.forEach((series, seriesIndex) => {
      let y =  yFor(date, series);
      if (Number.isFinite(y)) {
        focusCircles[seriesIndex].attr('transform', 'translate(' + xScale(date) + ',' + yScale(y) + ')')
          .style('display', null);
      } else {
        focusCircles[seriesIndex].style('display', 'none');
      }
      values[seriesIndex] = Number.isFinite(y) ? callbacks.formatYLabels(y) : '--';
    });

    tooltipData.values = values;
    if (callbacks.showTooltip) {
      callbacks.showTooltip(tooltipData);
    }
  }

  function hideCircles() {
    focus.style("display", 'none');
    if (callbacks.hideTooltip) {
      callbacks.hideTooltip();
    }
  }
}

function create0Axis(vis, yScale, dim) {
  if (yScale(0) >= 0 && yScale(0) <= dim.chartHeight) {
    let zeroAxis = vis.append('g')
      .attr('class', 'y-axis-zero')
      .attr('transform', 'translate(' + dim.leftMargin + ',' + (dim.topMargin + yScale(0)) + ')' );

    zeroAxis.append('line')
      .attr('x1', 0)
      .attr('x2', dim.chartWidth)
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke', '#aaa');
  }
}
