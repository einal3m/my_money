import React from 'react';
import { render, screen } from '@testing-library/react';
import ChartLegend from 'components/reports/ChartLegend';

describe('D3PieChart', () => {
  it('renders a chart container', () => {
    const chartData = {
      seriesData: [{ name: 'Series One', backGroundColour: 'red' }, { name: 'Series Two', backgroundColour: 'blue' }],
    };

    render(<ChartLegend chartData={chartData} />);

    expect(screen.getByText('Series One')).toBeInTheDocument();
    expect(screen.getByText('Series Two')).toBeInTheDocument();
  });
});
