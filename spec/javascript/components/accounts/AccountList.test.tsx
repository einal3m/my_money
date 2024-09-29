import React from 'react'
import store from 'stores/store'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { expect, test, beforeAll, afterEach, afterAll } from 'vitest'
import { accountsMock, accountTypesMock } from 'mocks/accountMocks'

import AccountList from 'components/accounts/AccountList'

const handlers = [
  http.get('/api/account_types', async () => {
    return HttpResponse.json(accountTypesMock)
  }),
  http.get('/api/accounts', async () => {
    return HttpResponse.json(accountsMock)
  }),
]
const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders a list of accounts', async () => {
  render(
    <Provider store={store}>
      <AccountList />
    </Provider>,
  )

  // page header
  const pageTitle = screen.getByRole('heading', { level: 1 })
  expect(pageTitle.textContent).toEqual('my accounts')

  // new button
  expect(screen.getByText('New')).toBeDefined()

  await waitFor(() => {
    // account types
    const categoryTypeHeadings = screen.getAllByRole('heading', { level: 5 })
    expect(categoryTypeHeadings.length).toEqual(2)
    expect(categoryTypeHeadings.at(0)?.textContent).toEqual('Savings Accounts')
    expect(categoryTypeHeadings.at(1)?.textContent).toEqual('Loan Accounts')

    // accounts 1
    expect(screen.getByText('AccountOne')).toBeDefined()
    expect(screen.getByText('BankOne')).toBeDefined()

    // account 2
    expect(screen.getByText('AccountTwo')).toBeDefined()
  })
})
