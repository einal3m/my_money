import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import { TransactionListComponent as TransactionList } from '../transaction-list';
import SearchCriteria from '../search-criteria';
import PageHeader from '../../common/page-header';
import TransactionTable from '../transaction-table';
import TransactionModal from '../transaction-modal';
import * as formActions from '../../../actions/form-actions';

describe('TransactionList', () => {
  let transactionList;
  beforeEach(() => {
    transactionList = shallowRenderer(<TransactionList loaded currentAccount={{ id: 12, name: 'Melanie' }} />);
  });

  describe('render', () => {
    it('search criteria and transaction table', () => {
      const [header, searchCriteria, table, importModal, editModal] = transactionList.props.children;

      expect(header.props.title).toEqual('my transactions');
      expect(header.props.children[0].props.children[1]).toMatch(/Import/);
      expect(header.props.children[1].props.children[1]).toMatch(/New/);
      expect(header.type).toEqual(PageHeader);
      expect(searchCriteria.props.children.type).toEqual(SearchCriteria);
      expect(table.props.children.type).toEqual(TransactionTable);
      expect(importModal).toBeUndefined();
      expect(editModal.type).toEqual(TransactionModal);
    });
  });

  describe('events', () => {
    it('shows edit transaction modal when new button clicked', () => {
      spyOn(formActions, 'showFormModal');
      const newButton = transactionList.props.children[0].props.children[1];

      newButton.props.onClick();

      expect(formActions.showFormModal).toHaveBeenCalledWith('Transaction', { accountId: 12 }, { allowDelete: false });
    });
  });
});
