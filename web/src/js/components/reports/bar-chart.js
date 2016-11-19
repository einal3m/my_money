import d3 from 'd3';

export default function bar_chart(xAxisLabels, seriesData, id, options, callbacks) {
  const noOfSeries = seriesData.length;
  const noOfPeriods = xAxisLabels.length;

  const width = options.width || 1000;
  const height = options.height || 500;

  const dim = {
    noOfPeriods,
    topMargin: 10,
    leftMargin: 80,
    periodGap: 20,
    barGap: 5,
    xAxisHeight: 30,
  };

  dim.chartHeight = height - dim.topMargin - dim.xAxisHeight;
  dim.chartWidth = width - dim.leftMargin;
  dim.periodWidth = dim.chartWidth / noOfPeriods;
  dim.barWidth = (dim.periodWidth - dim.periodGap - (noOfSeries - 1) * dim.barGap) / noOfSeries;

  // main svg container
  const vis = d3.select(id).append('svg')
    .attr('width', width)
    .attr('height', height);

  // create axes
  const [xScale, yScale] = createScales(xAxisLabels, seriesData, dim);
  createYAxis(vis, yScale, dim, callbacks);
  createXAxis(vis, xScale, dim);

  // create series
  createSeries(vis, seriesData, yScale, dim, noOfSeries);
  createHover(vis, xAxisLabels, seriesData, dim, callbacks);
  create0Axis(vis, yScale, dim);
}
function createSeries(vis, seriesData, yScale, dim, noOfSeries) {
  seriesData.forEach((series, seriesIndex) => {
    const seriesGroup = vis.append('g')
      .attr('class', `series${seriesIndex}`)
      .attr('transform', `translate(${dim.leftMargin + dim.periodGap / 2 + seriesIndex * (dim.barWidth + dim.barGap)}, ${dim.topMargin})`);

    const bars = seriesGroup.selectAll('g')
      .data(series.data)
      .enter().append('rect')
      .attr('transform', (data, i) => `translate(${i * (noOfSeries * dim.barWidth + dim.periodGap + (noOfSeries - 1) * dim.barGap)}, 0)`)
      .attr('width', dim.barWidth)
      .attr('height', data => Math.abs(yScale(data) - yScale(0)))
      .attr('y', data => data > 0 ? yScale(data) : yScale(0))
      .style({ fill: series.backgroundColour });
  });
}

function createHover(vis, xAxisLabels, seriesData, dim, callbacks) {
  const periodGroup = vis.append('g')
    .attr('class', 'hover')
    .attr('transform', `translate(${dim.leftMargin}, ${dim.topMargin})`);

  xAxisLabels.forEach((label, periodIndex) => {
    const tooltipData = {
      periodLabel: label,
      seriesLabel: seriesData.map(series => series.name),
      colours: seriesData.map(series => series.backgroundColour),
      values: seriesData.map(series => callbacks.formatYLabels(series.data[periodIndex])),
      tooltipPosition: (periodIndex / dim.noOfPeriods) < 0.5 ? 'right' : 'left',
    };

    periodGroup.append('rect')
      .attr('transform', `translate(${periodIndex * dim.periodWidth}, 0)`)
      .attr('width', dim.periodWidth)
      .attr('height', dim.chartHeight)
      .style({ fill: 'transparent' })

      .on('mouseover', function (d) {
        if (callbacks.showTooltip) {
          callbacks.showTooltip(tooltipData);
        }
        d3.select(this).style({ fill: 'grey', opacity: 0.05 });
      }).on('mouseout', function (d) {
        if (callbacks.hideTooltip) {
          callbacks.hideTooltip();
        }
        d3.select(this).style({ fill: 'transparent' });
      });
  });
}

function createScales(xAxisLabels, seriesData, dim) {
  const yScale = d3.scale.linear()
    .domain([
      d3.min(seriesData, series => d3.min(series.data)),
      d3.max(seriesData, series => d3.max(series.data))])
    .range([dim.chartHeight, 0]).nice();

  const xScale = d3.scale.ordinal()
    .domain(xAxisLabels)
    .rangeRoundBands([0, dim.chartWidth]);

  return [xScale, yScale];
}

function createYAxis(vis, yScale, dim, callbacks) {
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
    .attr('x', -40)
    .attr('text-anchor', 'right');
}

function createXAxis(vis, xScale, dim) {
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

function create0Axis(vis, yScale, dim) {
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

