import React from 'react';
import { shallow } from 'enzyme';
import PieAndTable from '../pie-and-table';
import D3PieChart from '../d3-pie-chart';

describe('PieAndTable', () => {
  describe('render', () => {
    let pieAndTable;

    beforeEach(() => {
      pieAndTable = shallow(<PieAndTable loaded title="income" />);
    });

    it('has a page header', () => {
      const title = pieAndTable.childAt(0);

      expect(title.type()).toEqual('h3');
      expect(title.text()).toEqual('income');
    });

    it('has a table with d3 pie chart in first row', () => {
      const table = pieAndTable.childAt(1);
      expect(table.type()).toEqual('table');

      const firstRow = table.find('tr').first().find(D3PieChart);
      expect(firstRow.prop('id')).toEqual('income');
    });
  });
});
