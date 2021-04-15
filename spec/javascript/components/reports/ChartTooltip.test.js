import React from 'react';
import { render, screen, within } from '@testing-library/react';
import ChartTooltip from 'components/reports/ChartTooltip';

describe('ChartTooltip', () => {
  it('displays each series name,amount and colour', () => {
    const tooltipData = {
      periodLabel: 'Tooltip Title',
      seriesLabel: ['Series One', 'Series Two'],
      colours: ['red', 'blue'],
      values: ['32', '45'],
      tooltipPosition: 'left',
    };

    render(<ChartTooltip show tooltipData={tooltipData} />);

    expect(screen.getByTestId('tooltip-title')).toHaveTextContent('Tooltip Title');
    const series1 = screen.getByText('Series One').closest('div');
    const series2 = screen.getByText('Series Two').closest('div');

    const group1 = within(series1);
    expect(group1.getByText('32')).toBeInTheDocument();

    const group2 = within(series2);
    expect(group2.getByText('45')).toBeInTheDocument();
  });
});
