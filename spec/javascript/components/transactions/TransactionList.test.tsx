import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { expect, test, beforeAll, afterEach, afterAll } from 'vitest'

import store from 'stores/store'
import { accountsMock, accountTypesMock } from 'mocks/accountMocks'
import TransactionList from 'components/transactions/TransactionList'
import { transactionsAccount1 } from 'mocks/transactionMocks'
import { dateRangesMock } from 'mocks/dateRangeMocks'
import {
  categoriesMock,
  categoryTypesMock,
  subcategoriesMock,
} from 'mocks/categoryMocks'

const handlers = [
  http.get('/api/account_types', async () => {
    return HttpResponse.json(accountTypesMock)
  }),
  http.get('/api/accounts', async () => {
    return HttpResponse.json(accountsMock)
  }),
  http.get('/api/date_range_options', async () => {
    return HttpResponse.json(dateRangesMock)
  }),
  http.get('/api/category_type2', async () => {
    return HttpResponse.json(categoryTypesMock)
  }),
  http.get('/api/categories', async () => {
    return HttpResponse.json(categoriesMock)
  }),
  http.get('/api/subcategories', async () => {
    return HttpResponse.json(subcategoriesMock)
  }),
  http.get('/api/accounts/1/transactions', async () => {
    return HttpResponse.json(transactionsAccount1)
  }),
]
const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders a list of accounts', async () => {
  render(
    <Provider store={store}>
      <TransactionList />
    </Provider>,
  )

  // page header
  const pageTitle = screen.getByRole('heading', { level: 1 })
  expect(pageTitle.textContent).toEqual('my transactions')

  // new button
  expect(screen.getByText('New')).toBeDefined()

  await waitFor(() => {
    const listHeading = screen.getByRole('heading', { level: 3 })
    expect(listHeading.textContent).toEqual(
      'Transactions for AccountOne (BankOne)',
    )

    // transaction 1
    expect(screen.getByText('Memo1')).toBeDefined()
    expect(screen.getByText('$10')).toBeDefined()

    // transaction 2
    expect(screen.getByText('Note2')).toBeDefined()
    expect(screen.getByText('IncomeTwo/IncomeTwoSub')).toBeDefined()
    expect(screen.getByText('$40')).toBeDefined()
  })
})
