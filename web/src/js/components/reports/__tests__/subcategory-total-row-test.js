import React from 'react';
import { shallow } from 'enzyme';
import SubcategoryTotalRow from '../subcategory-total-row';
import * as routingActions from '../../../actions/routing-actions';

describe('SubcategoryTotalRow', () => {
  const subcategory = {
    subcategoryId: 12,
    categoryId: 45,
    name: 'My Subcategory',
    amount: 4050,
  };
  let row;

  beforeEach(() => {
    spyOn(routingActions, 'routeToSubcategoryReport');
    row = shallow(<SubcategoryTotalRow {...subcategory} />);
  });

  describe('render', () => {
    it('renders a row with 3 columns', () => {
      expect(row.type()).toEqual('tr');
      expect(row.childAt(0).text()).toEqual('My Subcategory');
      expect(row.childAt(1).text()).toEqual('$ 40.50');
      expect(row.childAt(2).text()).toEqual('');
    });
  });

  describe('events', () => {
    it('clicking on row calls routing action', () => {
      row.prop('onClick')();

      expect(routingActions.routeToSubcategoryReport).toHaveBeenCalledWith(45, 12);
    });
  });
});
