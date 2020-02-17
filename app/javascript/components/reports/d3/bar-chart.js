import d3 from 'd3';
import { createSvgContainer, createBarScales, createYAxis, createBarXAxis, create0Axis } from './common';

export default function barChart(xAxisLabels, seriesData, id, options, callbacks) {
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
  dim.barWidth = (dim.periodWidth - dim.periodGap - ((noOfSeries - 1) * dim.barGap)) / noOfSeries;

  const vis = createSvgContainer(id, width, height);

  // create axes
  const [xScale, yScale] = createBarScales(xAxisLabels, seriesData, dim);
  createYAxis(vis, yScale, dim, callbacks);
  createBarXAxis(vis, xScale, dim);

  // create series
  createSeries(vis, seriesData, yScale, dim, noOfSeries);
  createHover(vis, xAxisLabels, seriesData, dim, callbacks);
  create0Axis(vis, yScale, dim);
}

function createSeries(vis, seriesData, yScale, dim, noOfSeries) {
  seriesData.forEach((series, index) => {
    const seriesGroup = vis.append('g')
      .attr('class', `series${index}`)
      .attr(
        'transform',
        `translate(${dim.leftMargin + (dim.periodGap / 2) + (index * (dim.barWidth + dim.barGap))}, ${dim.topMargin})`
      );

    seriesGroup.selectAll('g')
      .data(series.data)
      .enter().append('rect')
      .attr('transform', (data, i) => (
        `translate(${i * ((noOfSeries * dim.barWidth) + dim.periodGap + ((noOfSeries - 1) * dim.barGap))}, 0)`
      ))
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

      .on('mouseover', () => {
        if (callbacks.showTooltip) {
          callbacks.showTooltip(tooltipData);
        }
        d3.select(this).style({ fill: 'grey', opacity: 0.05 });
      })
      .on('mouseout', () => {
        if (callbacks.hideTooltip) {
          callbacks.hideTooltip();
        }
        d3.select(this).style({ fill: 'transparent' });
      });
  });
}
