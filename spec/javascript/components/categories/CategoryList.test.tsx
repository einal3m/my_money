import React from 'react'
import store from 'stores/store'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { expect, test, beforeAll, afterEach, afterAll } from 'vitest'
import {
  categoryTypesMock,
  categoriesMock,
  subcategoriesMock,
} from 'mocks/categoryMocks'

import { CategoryList } from 'components/categories/CategoryList.tsx'

const handlers = [
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

test('renders a list of categories', async () => {
  render(
    <Provider store={store}>
      <CategoryList />
    </Provider>,
  )

  // page header
  const pageTitle = screen.getByRole('heading', { level: 1 })
  expect(pageTitle.textContent).toEqual('my categories')

  // new button
  expect(screen.getByText('New')).toBeDefined()

  await waitFor(() => {
    // category types
    const categoryTypeHeadings = screen.getAllByRole('heading', { level: 5 })
    expect(categoryTypeHeadings.length).toEqual(2)
    expect(categoryTypeHeadings.at(0)?.textContent).toEqual('Income')
    expect(categoryTypeHeadings.at(1)?.textContent).toEqual('Expense')

    // categories
    expect(screen.getByText('IncomeOne')).toBeDefined()
    expect(screen.getByText('IncomeTwo')).toBeDefined()
    expect(screen.getByText('ExpenseThree')).toBeDefined()

    // subcategories
    expect(screen.getByText('IncomeTwoSub')).toBeDefined()
  })
})
