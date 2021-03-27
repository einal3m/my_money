import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import { PatternTableComponent as PatternTable } from '../pattern-table';
import PatternRow from '../pattern-row';

describe('PatternTable', () => {
  let patternTable;
  const patterns = [{ id: 1, matchText: 'MATCH', notes: 'my notes', categoryId: 4, subcategoryId: 6 }];
  const account = { name: 'my Account' };
  const groupedCategories = [{
    categoryType: 'Income',
    categories: [{ id: 4, name: 'my category', subcategories: [{ id: 6, name: 'my subcategory' }] }],
  }];

  describe('render', () => {
    it('when criteria not loaded, renders nothing', () => {
      patternTable = shallowRenderer(
        <PatternTable
          loaded={false}
          patterns={[]}
          account={null}
          groupedCategories={groupedCategories}
        />
      );

      expect(patternTable.props.children[0]).toBeUndefined();
      expect(patternTable.props.children[1]).toBeUndefined();
    });

    it('when criteria loaded and no transactions, renders message', () => {
      patternTable = shallowRenderer(
        <PatternTable
          loaded
          patterns={[]}
          account={account}
          groupedCategories={groupedCategories}
        />
      );

      const [title, message] = patternTable.props.children;
      expect(title.props.children).toEqual(["patterns for '", 'my Account', "' account"]);
      expect(message.props.children).toMatch('no patterns');
    });

    it('when criteria loaded and has patterns, renders table', () => {
      patternTable = shallowRenderer(
        <PatternTable
          loaded
          patterns={patterns}
          account={account}
          groupedCategories={groupedCategories}
        />
      );

      const [title, table] = patternTable.props.children;
      expect(title.props.children).toEqual(["patterns for '", 'my Account', "' account"]);

      const [thead, tbody] = table.props.children;
      expect(table.type).toEqual('table');

      const [matchText, notes, category] = thead.props.children.props.children;
      expect(matchText.props.children).toEqual('match text');
      expect(notes.props.children).toEqual('notes');
      expect(category.props.children).toEqual('category');

      expect(tbody.props.children[0].type).toEqual(PatternRow);
      expect(tbody.props.children[0].props.pattern).toEqual(patterns[0]);
      expect(tbody.props.children[0].props.groupedCategories).toEqual(groupedCategories);
    });
  });
});
