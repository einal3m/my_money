import React from 'react';
import { shallow } from 'enzyme';
import SubcategoryTotalRow from '../subcategory-total-row';

describe('SubcategoryTotalRow', () => {
  const subcategory = {
    subcategoryId: 12,
    categoryId: 45,
    name: 'My Subcategory',
    amount: 4050,
  };

  describe('render', () => {
    it('renders a row with 3 columns', () => {
      const row = shallow(<SubcategoryTotalRow {...subcategory} />);

      expect(row.type()).toEqual('tr');

      expect(row.childAt(0).text()).toEqual('My Subcategory');
      expect(row.childAt(1).text()).toEqual('$ 40.50');
      expect(row.childAt(2).text()).toEqual('');
    });
  });
});
