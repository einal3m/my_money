import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import React from 'react';
import { ImportPage } from '../import-page';
import PageHeader from '../../common/page-header';
import ImportTable from '../import-table';
import { Button } from 'react-bootstrap';
import importActions from '../../../actions/import-actions';

describe('ImportPage', () => {
  let importPage, account, transactions;
  beforeEach(() => {
    account = {id: 1, name: 'Account1'};
    transactions = [{amount: 50}, {amount: 250}];

    importPage = shallowRenderer(
      <ImportPage account={account} ofxTransactions={transactions} />
    );
  });

  describe('render', () => {
    it('has a header and a table', () => {
      let [header, table] = importPage.props.children;

      expect(header.type).toEqual(PageHeader);
      expect(header.props.title).toEqual('import transactions');
      expect(header.props.children.type).toEqual(Button);

      expect(table.props.children.type).toEqual(ImportTable);
      expect(table.props.children.props.transactions).toEqual(transactions);
    });
  });

  describe('events', () => {
    describe('click import button', () => {
      it('calls the import action', () => {
        spyOn(importActions, 'importTransactions');
        let button = importPage.props.children[0].props.children;
        button.props.onClick();

        expect(importActions.importTransactions).toHaveBeenCalled();
      });
    });
  });
});
