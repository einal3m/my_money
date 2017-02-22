import React from 'react';
import { shallow } from 'enzyme';
import CategoryTotalRow from '../category-total-row';
import * as routingActions from '../../../actions/routing-actions';

describe('CategoryTotalRow', () => {
  const category = {
    categoryId: 45,
    name: 'My Category',
    amount: 4050,
  };
  let row;

  beforeEach(() => {
    spyOn(routingActions, 'routeToCategoryReport');
    row = shallow(<CategoryTotalRow {...category} />);
  });

  describe('render', () => {
    it('renders a row with 3 columns', () => {
      expect(row.type()).toEqual('tr');
      expect(row.childAt(0).text()).toEqual('My Category');
      expect(row.childAt(1).text()).toEqual('');
      expect(row.childAt(2).text()).toEqual('$ 40.50');
    });
  });

  describe('events', () => {
    it('clicking on row calls routing action', () => {
      row.prop('onClick')();

      expect(routingActions.routeToCategoryReport).toHaveBeenCalledWith(45);
    });
  });
});
