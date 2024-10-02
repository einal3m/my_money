import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { expect, test, beforeAll, afterEach, afterAll } from 'vitest'

import store from 'stores/store'
import { accountsMock, accountTypesMock } from 'mocks/accountMocks'
import { bankStatementsMock } from 'mocks/bankStatementMocks'
import ImportHistoryPage from 'components/import/ImportHistoryPage'

const handlers = [
  http.get('/api/account_types', async () => {
    return HttpResponse.json(accountTypesMock)
  }),
  http.get('/api/accounts', async () => {
    return HttpResponse.json(accountsMock)
  }),
  http.get('/api/accounts/1/bank_statements', async () => {
    return HttpResponse.json(bankStatementsMock)
  }),
]
const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders a list of accounts', async () => {
  render(
    <Provider store={store}>
      <ImportHistoryPage />
    </Provider>,
  )

  // page header
  const pageTitle = screen.getByRole('heading', { level: 1 })
  expect(pageTitle.textContent).toEqual('import history')

  await waitFor(() => {
    // delete button for each row
    expect(screen.getAllByText('Delete').length).toEqual(2)

    // bank statement 1
    expect(screen.getByText('19-Oct-2001')).toBeDefined()
    expect(screen.getByText('one.ofx')).toBeDefined()
    expect(screen.getByText('6')).toBeDefined()

    // bank statement 2
    expect(screen.getByText('20-Oct-2001')).toBeDefined()
    expect(screen.getByText('two.ofx')).toBeDefined()
    expect(screen.getByText('8')).toBeDefined()
  })
})
