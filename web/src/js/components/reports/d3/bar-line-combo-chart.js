import d3 from 'd3';
import { createSvgContainer, createBarScales, createYAxis, createBarXAxis, create0Axis } from './common';

const LINE_COLOUR = '#1F77B4';

export default function barLineComboChart(xAxisLabels, seriesData, id, options, callbacks) {
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
  dim.barWidth = dim.periodWidth - dim.periodGap;

  const vis = createSvgContainer(id, width, height);

  // create axes
  const [xScale, yScale] = createBarScales(xAxisLabels, seriesData, dim);
  createYAxis(vis, yScale, dim, callbacks);
  createBarXAxis(vis, xScale, dim);
  create0Axis(vis, yScale, dim);

  createSeries(vis, seriesData, yScale, dim, 1);
  createNetLine(vis, xAxisLabels, seriesData, xScale, yScale, dim);

  createHover(vis, xAxisLabels, seriesData, dim, callbacks);
}

function createSeries(vis, seriesData, yScale, dim) {
  seriesData.forEach((series, index) => {
    const seriesGroup = vis.append('g')
      .attr('class', `series${index}`)
      .attr(
        'transform',
        `translate(${dim.leftMargin + (dim.periodGap / 2)}, ${dim.topMargin})`
      );

    seriesGroup.selectAll('g')
      .data(series.data)
      .enter().append('rect')
      .attr('transform', (data, i) => (
        `translate(${i * (dim.barWidth + dim.periodGap)}, 0)`
      ))
      .attr('width', dim.barWidth)
      .attr('height', data => Math.abs(yScale(data) - yScale(0)))
      .attr('y', data => data > 0 ? yScale(data) : yScale(0))
      .style({ fill: series.backgroundColour });
  });
}

function createNetLine(vis, xAxisLabels, seriesData, xScale, yScale, dim) {
  // Define the line
  const line = d3.svg.line()
    .x((d, i) => xScale(xAxisLabels[i]))
    .y((d, i) => yScale((seriesData[0].data[i] + seriesData[1].data[i])))
    .interpolate('linear');

  // add the lines
  vis.append('g')
    .attr('transform', `translate(${(dim.leftMargin + (dim.barWidth / 2) + dim.barGap)}, ${dim.topMargin})`)
    .append('path')
    .attr('d', line(seriesData[0].data))
    .attr('stroke', LINE_COLOUR)
    .attr('stroke-width', 2)
    .attr('fill', 'none');
}

function createHover(vis, xAxisLabels, seriesData, dim, callbacks) {
  const periodGroup = vis.append('g')
    .attr('class', 'hover')
    .attr('transform', `translate(${dim.leftMargin}, ${dim.topMargin})`);

  xAxisLabels.forEach((label, periodIndex) => {
    const seriesLabel = seriesData.map(series => series.name);
    seriesLabel.push('Net');

    const values = seriesData.map(series => callbacks.formatYLabels(series.data[periodIndex]));
    values.push(callbacks.formatYLabels(seriesData[0].data[periodIndex] + seriesData[1].data[periodIndex]));

    const colours = seriesData.map(series => series.backgroundColour);
    colours.push(LINE_COLOUR);

    const tooltipData = {
      periodLabel: label,
      seriesLabel,
      colours,
      values,
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
