import React from 'react';
import { shallow } from 'enzyme';
import ReportTotalRow from '../report-total-row';

describe('ReportTotalRow', () => {
  describe('render', () => {
    it('renders a row with 3 columns', () => {
      const row = shallow(<ReportTotalRow amount={2010} />);

      expect(row.type()).toEqual('tr');

      expect(row.childAt(0).text()).toEqual('Total');
      expect(row.childAt(1).text()).toEqual('');
      expect(row.childAt(2).text()).toEqual('$ 20.10');
    });
  });
});
