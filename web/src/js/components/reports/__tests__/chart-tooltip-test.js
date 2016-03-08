import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import ChartTooltip from '../chart-tooltip';

describe('ChartTooltip', () => {
  it('displays each series name,amount and colour', () => {
    let tooltipData = {
      periodLabel: 'Tooltip Title',
      seriesLabel: ['Series One', 'Series Two'],
      colours: ['red', 'blue'],
      values: ['32', '45'],
      tooltipPosition: 'left'
    };

    let chartTooltip = shallowRenderer(<ChartTooltip show tooltipData={tooltipData} />);
    let [title, tooltipItems] = chartTooltip.props.children.props.children;

    expect(title.props.children).toEqual('Tooltip Title');
    let [seriesOne, seriesTwo] = tooltipItems.props.children;

    let [point, seriesLabel, value] = seriesOne.props.children;
    expect(seriesLabel.props.children).toEqual('Series One');
    expect(value.props.children).toEqual('32');

    [point, seriesLabel, value] = seriesTwo.props.children;
    expect(seriesLabel.props.children).toEqual('Series Two');
    expect(value.props.children).toEqual('45');
  });
});
