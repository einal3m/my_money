import React from 'react';
import { shallow } from 'enzyme';
import CategoryTotalRow from '../category-total-row';

describe('CategoryTotalRow', () => {
  const category = {
    categoryId: 45,
    name: 'My Category',
    amount: 4050,
  };

  describe('render', () => {
    it('renders a row with 3 columns', () => {
      const row = shallow(<CategoryTotalRow {...category} />);

      expect(row.type()).toEqual('tr');
      expect(row.childAt(0).text()).toEqual('My Category');
      expect(row.childAt(1).text()).toEqual('');
      expect(row.childAt(2).text()).toEqual('$ 40.50');
    });
  });
});
