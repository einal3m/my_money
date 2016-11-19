import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import React from 'react';
import { ImportPage } from '../import-page';
import PageHeader from '../../common/page-header';
import ImportTable from '../import-table';
import { Button } from 'react-bootstrap';
import importActions from '../../../actions/import-actions';

describe('ImportPage', () => {
  let importPage,
    account,
    transactions,
    groupedCategories,
    subcategories;
  beforeEach(() => {
    account = { id: 1, name: 'Account1' };
    transactions = [{ amount: 50 }, { amount: 250 }];
    groupedCategories = ['categories'];
    subcategories = ['subcategories'];

    importPage = shallowRenderer(
      <ImportPage account={account} ofxTransactions={transactions}
        groupedCategories={groupedCategories} subcategories={subcategories}
      />
    );
  });

  describe('render', () => {
    it('has a header, title and a table', () => {
      const [header, container] = importPage.props.children;
      const [title, table] = container.props.children;

      expect(header.type).toEqual(PageHeader);
      expect(header.props.title).toEqual('import transactions');
      expect(header.props.children.type).toEqual(Button);

      expect(title.props.children[0]).toEqual('into ');
      expect(title.props.children[1].props.children).toEqual('Account1');
      expect(title.props.children[2]).toEqual(' account');

      expect(table.type).toEqual(ImportTable);
      expect(table.props.transactions).toEqual(transactions);
      expect(table.props.groupedCategories).toEqual(groupedCategories);
      expect(table.props.subcategories).toEqual(subcategories);
    });
  });

  describe('events', () => {
    describe('click import button', () => {
      it('calls the import action', () => {
        spyOn(importActions, 'importTransactions');
        const button = importPage.props.children[0].props.children;
        button.props.onClick();

        expect(importActions.importTransactions).toHaveBeenCalled();
      });
    });
  });
});
