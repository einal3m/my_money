import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import React from 'react';
import { CategoryList } from '../category-list';
import PageHeader from '../../common/page-header';
import { fromJS } from 'immutable';

describe('CategoryList', () => {
  let categoryList, categoryTypes;
  beforeEach(() => {
    categoryTypes = fromJS([
      { code: 'income', name: 'Income' },
      { code: 'expense', name: 'Expense' },
      { code: 'transfer', name: 'Transfer' }
    ]);

    categoryList = shallowRenderer(<CategoryList loaded categoryTypes={categoryTypes} />);
  });

  it('has a header', () => {
    let [header, categoryGroup] = categoryList.props.children;

    expect(header.type).toEqual(PageHeader);
    expect(header.props.title).toEqual('my categories');
  });
});
