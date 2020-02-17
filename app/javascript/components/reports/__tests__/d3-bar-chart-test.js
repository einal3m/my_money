import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import D3BarChart from '../d3-bar-chart';
import ChartTooltip from '../chart-tooltip';

describe('D3BarChart', () => {
  it('renders a tooltip and a chart container', () => {
    const seriesData = [
      { name: 'Actual', data: [400, 2300, -1000, -1005, -2345], backgroundColour: '#61ABDB', borderColor: 'maroon' },
      { name: 'Last Year', data: [4300, 2300, 1000, -1500, -2345], backgroundColour: '#FDCA3A', borderColor: 'maroon' },
      { name: 'Budget', data: [2500, -2300, -3330, -1500, 10], backgroundColour: '#80D8C4', borderColor: 'maroon' },
    ];

    const xAxisLabels = ['Feb-15', 'Mar-15', 'Apr-15', 'May-15', 'Jun-15'];

    const chartData = { seriesData, xAxisLabels };

    const chart = shallowRenderer(<D3BarChart chartData={chartData} />);
    const [tooltip, chartContainer] = chart.props.children;

    expect(tooltip.type).toEqual(ChartTooltip);
    expect(chartContainer.props.id).toEqual('d3-chart');
  });
});
