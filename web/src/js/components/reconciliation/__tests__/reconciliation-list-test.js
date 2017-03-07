import React from 'react';
import { shallow } from 'enzyme';
import { ReconciliationListComponent as ReconciliationList } from '../reconciliation-list';
import PageHeader from '../../common/page-header';
import * as reconciliationActions from '../../../actions/reconciliation-actions';

describe('ReconciliationList', () => {
  describe('render', () => {
    it('renders a page header', () => {
      spyOn(reconciliationActions, 'getReconciliations');
      const list = shallow(<ReconciliationList />);

      const header = list.childAt(0);
      expect(header.type()).toEqual(PageHeader);
      expect(header.prop('title')).toEqual('account reconciliation');

      expect(reconciliationActions.getReconciliations).toHaveBeenCalled();
    });
  });
});
