import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import ChartLegend from '../chart-legend';

describe('ChartLegend', () => {
  it('displays each series name', () => {
    let chartData = {
      seriesData: [{name: 'Series One', backGroundColour: 'red'}, {name: 'Series Two', backgroundColour: 'blue'}]
    };

    let chartLegend = shallowRenderer(<ChartLegend chartData={chartData} />);

    let legendItems = chartLegend.props.children.props.children.props.children;

    expect(legendItems[0].props.children).toEqual('Series One');
    expect(legendItems[1].props.children).toEqual('Series Two');
  });
});
