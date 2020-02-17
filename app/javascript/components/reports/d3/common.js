import d3 from 'd3';

export function createSvgContainer(id, width, height) {
  const vis = d3.select(id).append('svg')
    .attr('width', width)
    .attr('height', height);
  return vis;
}

export function createBarScales(xAxisLabels, seriesData, dim) {
  let min = d3.min(seriesData, series => d3.min(series.data));
  let max = d3.max(seriesData, series => d3.max(series.data));

  if (min === max && max > 0) {
    min = 0;
  } else if (min === max && max < 0) {
    max = 0;
  } else if (min === max) {
    min = 0;
    max = 10000;
  }

  const yScale = d3.scale.linear()
    .domain([min, max])
    .range([dim.chartHeight, 0]).nice();

  const xScale = d3.scale.ordinal()
    .domain(xAxisLabels)
    .rangeRoundBands([0, dim.chartWidth]);

  return [xScale, yScale];
}

export function createYAxis(vis, yScale, dim, callbacks) {
  const yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('right')
    .tickSize(dim.chartWidth)
    .ticks(10)
    .tickFormat(value => callbacks.formatYLabels(value));

  const yAxisG = vis.append('g')
    .call(yAxis)
    .attr('class', 'y-axis')
    .attr('transform', `translate(${dim.leftMargin}, ${dim.topMargin})`);

  yAxisG.selectAll('path.y-axis, .y-axis line, .y-axis path')
    .style({ fill: 'none', 'stroke-width': '1px', stroke: '#ddd', 'shape-rendering': 'crispEdges' });

  yAxisG.selectAll('text')
    .attr('x', -10)
    .style('text-anchor', 'end');
}

export function createBarXAxis(vis, xScale, dim) {
  const xAxis = d3.svg.axis()
    .scale(xScale)
    .tickSize(dim.chartHeight)
    .orient('top');

  const xAxisG = vis.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(${dim.leftMargin},${dim.topMargin + dim.chartHeight})`)
    .call(xAxis);

  xAxisG.selectAll('path.x-axis, .x-axis line, .x-axis path')
    .style({ fill: 'none', 'stroke-width': '1px', stroke: '#ddd', 'shape-rendering': 'crispEdges' });

  xAxisG.selectAll('text')
    .attr('y', 20);

  xAxisG.selectAll('.x-axis line')
    .attr('transform', `translate(${-dim.periodWidth / 2}, 0)`);
}

export function create0Axis(vis, yScale, dim) {
  if (yScale(0) >= 0 && yScale(0) <= dim.chartHeight) {
    const zeroAxis = vis.append('g')
      .attr('class', 'y-axis-zero')
      .attr('transform', `translate(${dim.leftMargin},${dim.topMargin + yScale(0)})`);

    zeroAxis.append('line')
      .attr('x1', 0)
      .attr('x2', dim.chartWidth)
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke', '#aaa');
  }
}
