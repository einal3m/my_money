import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import React from 'react';
import TransactionList from '../transaction-list';
import SearchCriteria from '../search-criteria';
import PageHeader from '../../common/page-header';
import TransactionTable from '../transaction-table';

describe('TransactionList', () => {
  let transactionList;

  describe('render', () => {
    it('search criteria and transaction table', () => {
      transactionList = shallowRenderer(<TransactionList />);

      let [header, searchCriteria, table] = transactionList.props.children;

      expect(header.props.title).toEqual('my transactions');
      expect(header.type).toEqual(PageHeader);
      expect(searchCriteria.props.children.type).toEqual(SearchCriteria);
      expect(table.props.children.type).toEqual(TransactionTable);
    });
  });
});
