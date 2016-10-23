import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import React from 'react';
import ImportTable from '../import-table';
import { Table } from 'react-bootstrap';
import ImportRow from '../import-row';

describe('ImportTable', () => {
  let importTable,
    transactions,
    groupedCategories,
    subcategories;
  beforeEach(() => {
    transactions = [{ amount: 50 }, { amount: 250 }];
    groupedCategories = ['categories'];
    subcategories = ['subcategories'];
  });

  describe('render', () => {
    it('has a table with row for each transaction', () => {
      importTable = shallowRenderer(
        <ImportTable transactions={transactions} groupedCategories={groupedCategories} subcategories={subcategories} />
      );

      expect(importTable.props.children.type).toEqual(Table);
      let [header, table] = importTable.props.children.props.children;

      expect(header.type).toEqual('thead');

      expect(table.props.children.length).toEqual(2);
      expect(table.props.children[0].props.transaction).toEqual(transactions[0]);
      expect(table.props.children[0].props.groupedCategories).toEqual(groupedCategories);
      expect(table.props.children[0].props.subcategories).toEqual(subcategories);
      expect(table.props.children[0].props.index).toEqual(0);
      expect(table.props.children[1].props.transaction).toEqual(transactions[1]);
      expect(table.props.children[1].props.groupedCategories).toEqual(groupedCategories);
      expect(table.props.children[1].props.subcategories).toEqual(subcategories);
      expect(table.props.children[1].props.index).toEqual(1);
    });

    it('has no table if no transactions', () => {
      importTable = shallowRenderer(
        <ImportTable transactions={[]} groupedCategories={groupedCategories} subcategories={subcategories} />
      );

      expect(importTable.props.children.props.children).toEqual('No transactions to import');
    });
  });
});
