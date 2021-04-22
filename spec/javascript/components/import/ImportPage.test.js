import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import selectEvent from 'react-select-event';
import store from 'stores/store';
import { storeAccounts } from 'actions/account-actions';
import { BrowserRouter, Route } from "react-router-dom";
import { storeCategoryTypes, storeCategories, storeSubcategories } from 'actions/category-actions';
import { storeOfxTransactions } from 'actions/import-actions';
import apiUtil from 'util/api-util';
import { Provider } from 'react-redux';
import ImportPage from 'components/import/ImportPage';

describe('ImportPage', () => {
  test('no transactions to import', () => {
    // setup data
    const account = { id: 1, name: 'My Account' };
    storeAccounts([account]);

    render(
      <Provider store={store}>
        <ImportPage />
      </Provider>
    );

    expect(screen.getByText('No transactions to import')).toBeInTheDocument();
  });

  test('importing transactions', async () => {

    // setup data
    const account = { id: 1, name: 'My Account' };
    storeAccounts([account]);

    const categoryTypes = [
      { id: 1, name: 'Income' },
      { id: 2, name: 'Expense' }
    ];
    storeCategoryTypes(categoryTypes);

    const categories = [
      { id: 11, name: 'Wages', categoryTypeId: 1 },
      { id: 12, name: 'Bills', categoryTypeId: 2 },
      { id: 13, name: 'Entertainment', categoryTypeId: 2 },
    ]
    storeCategories(categories);

    const subcategories = [
      { id: 1, categoryId: 11, name: 'One' },
      { id: 2, categoryId: 12, name: 'Groceries' },
      { id: 3, categoryId: 11, name: 'Two' },
      { id: 4, categoryId: 13, name: 'Movies' },
      { id: 5, categoryId: 11, name: 'Three' },
    ];
    storeSubcategories(subcategories);

    const transactions = [
      {
        accountId: 1,
        amount: -5500,
        date: "2021-03-09",
        duplicate: true,
        import: false,
        memo: "VILLAGE CINEMA",
        notes: null,
        categoryId: null,
        subcategoryId: null
      },
      {
        accountId: 1,
        amount: -7476,
        categoryId: 12,
        date: "2021-03-14",
        duplicate: false,
        import: true,
        memo: "COLES SUPERMARKETS",
        notes: "every day shopping",
        subcategoryId: 2,
      }
    ];
    storeOfxTransactions(transactions);

    // render the page
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ImportPage />
        </Provider>
        <Route path="/transactions">Transactions page</Route>
      </BrowserRouter>
    );

    // it displays the name of the account
    expect(screen.getByTestId('import-title')).toHaveTextContent('My Account');

    // it displays the first transaction's details
    const transaction1 = screen.getByText('VILLAGE CINEMA').closest('tr');
    const row1 = within(transaction1);
    expect(row1.getByText('09-Mar-2021')).toBeInTheDocument();
    expect(row1.getByTestId('import-checkbox').checked).toEqual(false);

    // it is highlighted as a duplicate
    expect(transaction1.className).toEqual('danger');

    // it displays the second transaction's details
    const transaction2 = screen.getByText('COLES SUPERMARKETS').closest('tr')
    expect(transaction2.className).toEqual('');

    const row2 = within(transaction2);
    expect(row2.getByText('14-Mar-2021')).toBeInTheDocument();
    expect(row2.getByTestId('import-checkbox').checked).toEqual(true);
    expect(row2.getByTestId('import-notes').value).toEqual('every day shopping');
    expect(row2.getByTestId('import-category')).toHaveTextContent("Bills");
    expect(row2.getByTestId('import-subcategory')).toHaveTextContent("Groceries");

    // edit the first transaction

    // fill in the note
    fireEvent.change(row1.getByTestId('import-notes'), { target: { value: 'Star wars' } });

    // select a category
    const categoryDropdown = row1.getByText('Un-assigned');
    await selectEvent.select(categoryDropdown, ['Entertainment']);
    expect(row1.getByTestId('import-subcategory')).toBeInTheDocument();

    // select a subcategory
    const subcategoryDropdown = row1.getByText('Un-assigned');
    await selectEvent.select(subcategoryDropdown, ['Movies']);

    // change to import the first transaction
    fireEvent.click(row1.getByTestId('import-checkbox'));
    expect(row1.getByTestId('import-checkbox').checked).toEqual(true);

    // setup the api request expectations
    jest.spyOn(apiUtil, 'post').mockImplementation(({body}) => {

      // it contains the correct account id
      expect(body.account_id).toEqual(account.id);

      // it contains the correct transactions
      const expectedTransaction1 = {
        account_id: 1,
        amount: -5500,
        date: "2021-03-09",
        memo: "VILLAGE CINEMA",
        notes: "Star wars",
        category_id: 13,
        subcategory_id: 4
      };
      const expectedTransaction2 = {
        account_id: 1,
        amount: -7476,
        date: "2021-03-14",
        memo: "COLES SUPERMARKETS",
        notes: "every day shopping",
        category_id: 12,
        subcategory_id: 2,
      };

      expect(body.transactions[0]).toEqual(jasmine.objectContaining(expectedTransaction1));
      expect(body.transactions[1]).toEqual(jasmine.objectContaining(expectedTransaction2));
    });

    // click the import button
    fireEvent.click(screen.getByText('Import'));

    // it redirects to the transactions page
    expect(screen.getByText('Transactions page')).toBeInTheDocument();
  });
});
