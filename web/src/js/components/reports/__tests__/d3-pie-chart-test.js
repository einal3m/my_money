import React from 'react';
import { mount } from 'enzyme';
import D3PieChart from '../d3-pie-chart';

describe('D3PieChart', () => {
  it('renders a chart container', () => {

    const chart = mount(
      <D3PieChart
        id="income"
        data={[500, 200]}
        labels={['One', 'Two']}
      />
    );

    expect(chart.childAt(0).prop('id')).toEqual('d3-chart-income');
  });
});
