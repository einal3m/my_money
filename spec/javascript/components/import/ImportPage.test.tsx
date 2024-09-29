import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { expect, test, beforeAll, afterEach, afterAll } from 'vitest'

import store from 'stores/store'
import { accountsMock, accountTypesMock } from 'mocks/accountMocks'
import ImportPage from 'components/import/ImportPage'
import {
  categoriesMock,
  categoryTypesMock,
  subcategoriesMock,
} from 'mocks/categoryMocks'
import { setOfxTransactions } from 'stores/importSlice'
import { ofxTransactions } from 'mocks/bankStatementMocks'

const handlers = [
  http.get('/api/account_types', async () => {
    return HttpResponse.json(accountTypesMock)
  }),
  http.get('/api/accounts', async () => {
    return HttpResponse.json(accountsMock)
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
]
const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders a list of accounts', async () => {
  store.dispatch(
    setOfxTransactions({ transactions: ofxTransactions, filename: 'file.ofx' }),
  )

  render(
    <Provider store={store}>
      <ImportPage />
    </Provider>,
  )

  // page header
  const pageTitle = screen.getByRole('heading', { level: 1 })
  expect(pageTitle.textContent).toEqual('import transactions')

  await waitFor(() => {
    // import button
    expect(screen.getByText('Import')).toBeDefined()

    const listHeading = screen.getByRole('heading', { level: 5 })
    expect(listHeading.textContent).toEqual('into AccountOne account')

    // transaction 1
    expect(screen.getByText('09-Mar-2021')).toBeDefined()
    expect(screen.getByText('VILLAGE CINEMA')).toBeDefined()
    expect(screen.getByText('55')).toBeDefined()

    // transaction 2
    expect(screen.getByText('14-Mar-2021')).toBeDefined()
    expect(screen.getByText('COLES SUPERMARKETS')).toBeDefined()
    expect(screen.getByDisplayValue('every day shopping')).toBeDefined()
    expect(screen.getByText('ExpenseThree')).toBeDefined()
    expect(screen.getByText('ExpenseThreeSub')).toBeDefined()
    expect(screen.getByText('74')).toBeDefined()
  })
})
