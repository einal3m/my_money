import React from 'react'
import store from 'stores/store'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { expect, test, beforeAll, afterEach, afterAll } from 'vitest'

import { accountsMock, accountTypesMock } from 'mocks/accountMocks'
import PatternList from 'components/patterns/PatternList'
import {
  categoriesMock,
  categoryTypesMock,
  subcategoriesMock,
} from 'mocks/categoryMocks'
import { patternsAccount1 } from 'mocks/patternMocks'

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
  http.get('/api/accounts/1/patterns', async () => {
    return HttpResponse.json(patternsAccount1)
  }),
]
const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders a list of accounts', async () => {
  render(
    <Provider store={store}>
      <PatternList />
    </Provider>,
  )

  // page header
  const pageTitle = screen.getByRole('heading', { level: 1 })
  expect(pageTitle.textContent).toEqual('my patterns')

  // new button
  expect(screen.getByText('New')).toBeDefined()

  await waitFor(() => {
    const listHeadings = screen.getAllByRole('heading', { level: 5 })
    expect(listHeadings?.at(0)?.textContent).toEqual('patterns for')
    expect(listHeadings?.at(1)?.textContent).toEqual('AccountOne')

    // pattern 1
    expect(screen.getByText('payment')).toBeDefined()
    expect(screen.getByText('work')).toBeDefined()
    expect(screen.getByText('IncomeTwo/IncomeTwoSub')).toBeDefined()

    // pattern 2
    expect(screen.getByText('Bunnings')).toBeDefined()
    expect(screen.getByText('hardware')).toBeDefined()
    expect(screen.getByText('ExpenseThree/ExpenseThreeSub')).toBeDefined()
  })
})
