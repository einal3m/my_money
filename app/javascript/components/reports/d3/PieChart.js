import * as d3 from "d3";

export default function pieChart(data, labels, chartSelector, options) {
  const chartSize = {
    width: options.width || 500,
    height: options.height || 500,
    outerRadius: 120,
    innerRadius: 40,
  };

  const vis = d3.select(chartSelector).append('svg')
    .attr('width', chartSize.width)
    .attr('height', chartSize.height);

  const pie = d3.pie().sort(null);

  createArcs(vis, chartSize, pie, data, labels);
  createTicks(vis, chartSize, pie, data);
  createTotal(vis, chartSize, data);
}

function createArcs(vis, chartSize, pie, data, labels) {
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  const arc = d3.arc().innerRadius(chartSize.innerRadius).outerRadius(chartSize.outerRadius);

  const arcs = vis.selectAll('g.arc')
    .data(pie(data))
    .enter().append('g')
    .attr('class', 'arc')
    .attr('transform', `translate(${chartSize.width / 2},${chartSize.height / 2})`);

  arcs.append('path')
    .attr('fill', (d, i) => colorScale(i))
    .attr('d', arc);

  const labelGroups = arcs.append('g')
    .attr('transform', (d) => {
      const c = arc.centroid(d);
      return `translate(${c[0] * 1.7},${c[1] * 1.7})`;
    })
    .attr('display', d => d.value > 1 ? null : 'none')
    .attr('text-anchor', d => isRightHalf(d) ? 'beginning' : 'end');

  labelGroups.append('text')
    .attr('class', 'arc-amount')
    .attr('dy', d => isTopHalf(d) ? 20 : 5)
    .text(d => formatMoney(d.value));

  labelGroups.append('text')
    .attr('class', 'arc-label')
    .attr('dy', d => isTopHalf(d) ? 5 : -10)
    .text((d, i) => labels[i]);
}

function isRightHalf(data) {
  return (data.startAngle + data.endAngle) / 2 < Math.PI;
}

function isTopHalf(data) {
  return (data.startAngle + data.endAngle) / 2 > Math.PI / 2 && (data.startAngle + data.endAngle) / 2 < Math.PI * 1.5;
}

function createTicks(vis, chartSize, pie, data) {
  const tickGroup = vis.append('g')
    .attr('class', 'tick')
    .attr('transform', `translate(${chartSize.width / 2},${chartSize.height / 2})`);

  const lines = tickGroup.selectAll('line').data(pie(data));

  lines.enter().append('line')
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', -chartSize.outerRadius - 3)
    .attr('y2', -chartSize.outerRadius - 8)
    .attr('stroke', 'gray')
    .attr('transform', d => `rotate(${((d.startAngle + d.endAngle) / 2) * (180 / Math.PI)})`);
}

function createTotal(vis, chartSize, data) {
  const totalGroup = vis.append('g')
    .attr('class', 'total-group')
    .attr('transform', `translate(${chartSize.width / 2},${chartSize.height / 2})`);

  totalGroup.append('circle')
    .attr('fill', 'white')
    .attr('r', chartSize.innerRadius);

  totalGroup.append('text')
    .attr('class', 'total-label')
    .attr('dy', -10)
    .attr('text-anchor', 'middle')
    .text('TOTAL');

  const total = formatMoney(data.reduce((a, b) => a + b));

  totalGroup.append('text')
    .attr('class', 'total-amount')
    .attr('dy', 10)
    .attr('text-anchor', 'middle')
    .text(total);
}

function formatMoney(dollarAmount) {
  return `$${(dollarAmount / 100.0).toFixed(2)}`;
}
