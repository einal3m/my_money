import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import React from 'react';
import { TransactionList } from '../transaction-list';
import SearchCriteria from '../search-criteria';
import PageHeader from '../../common/page-header';
import TransactionTable from '../transaction-table';
import categoryActions from '../../../actions/category-actions';

describe('TransactionList', () => {
  let transactionList;

  describe('render', () => {
    it('search criteria and transaction table', () => {
      spyOn(categoryActions, 'getCategories');
      transactionList = shallowRenderer(<TransactionList loaded currentAccount={{ name: 'Melanie' }} />);

      let [header, searchCriteria, table] = transactionList.props.children;

      expect(header.props.title).toEqual('my transactions');
      expect(header.props.children.props.children[1]).toMatch(/Import/);
      expect(header.type).toEqual(PageHeader);
      expect(searchCriteria.props.children.type).toEqual(SearchCriteria);
      expect(table.props.children.type).toEqual(TransactionTable);

      expect(categoryActions.getCategories).toHaveBeenCalled();
    });
  });
});
