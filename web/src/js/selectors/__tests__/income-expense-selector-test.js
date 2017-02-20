import { fromJS, Map } from 'immutable';
import { tableData } from '../income-expense-selector';

describe('IncomeExpenseSelector', () => {
  const categories = [
    { id: 11, name: 'z Expense1', categoryTypeId: 3 },
    { id: 12, name: 'Income1', categoryTypeId: 2 },
    { id: 13, name: 'Transfer', categoryTypeId: 1 },
    { id: 14, name: 'A Expense1', categoryTypeId: 3 },
    { id: 15, name: 'B Expense', categoryTypeId: 3 },
  ];

  const subcategories = [
    { id: 21, name: 'c Sub2', categoryId: 11 },
    { id: 22, name: 'a Sub1', categoryId: 11 },
    { id: 23, name: 'B Sub1', categoryId: 11 },
  ];

  const data = {
    income: {
      subcategory_totals: [],
      category_totals: [
        { sum: 1000, category_id: 12 },
        { sum: 4499, category_id: null },
      ],
      total: 5499,
    },
    expense: {
      subcategory_totals: [
        { sum: 20, category_id: 11, subcategory_id: 21 },
        { sum: 40, category_id: 11, subcategory_id: null },
        { sum: 5020, category_id: 11, subcategory_id: 22 },
      ],
      category_totals: [
        { sum: 5080, category_id: 11 },
        { sum: 4000, category_id: null },
        { sum: 1000, category_id: 14 },
      ],
      total: 15080,
    },
  };

  it('converts api response into table format', () => {
    const state = {
      categoryStore: fromJS({ categories, subcategories }),
      reportStore: fromJS({ incomeVsExpense: data }),
    };

    const result = tableData(state);

    const expectedTableData = {
      income: {
        total: 5499,
        rows: [
          { type: 'category', categoryId: 12, name: 'Income1', amount: 1000 },
          { type: 'category', categoryId: null, name: 'Un-assigned', amount: 4499 },
        ],
      },
      expense: {
        total: 15080,
        rows: [
          { type: 'category', categoryId: 14, name: 'A Expense1', amount: 1000 },
          { type: 'category', categoryId: 11, name: 'z Expense1', amount: 5080 },
          { type: 'subcategory', categoryId: 11, subcategoryId: 22, name: 'a Sub1', amount: 5020 },
          { type: 'subcategory', categoryId: 11, subcategoryId: 21, name: 'c Sub2', amount: 20 },
          { type: 'subcategory', categoryId: 11, subcategoryId: null, name: 'Un-assigned', amount: 40 },
          { type: 'category', categoryId: null, name: 'Un-assigned', amount: 4000 },
        ],
      },
    };

    expect(result.toJS()).toEqual(expectedTableData);
  });

  it('returns nothing if data is not loaded', () => {
    const state = {
      categoryStore: fromJS({ categories: [], subcategories: []}),
      reportStore: fromJS({ incomeVsExpense: Map({}) }),
    };

    expect(tableData(state).toJS()).toEqual({});
  });
});
