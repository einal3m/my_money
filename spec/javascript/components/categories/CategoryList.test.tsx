import React from 'react'

import store from 'stores/store'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
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
  http.put('/api/categories/2', async () => HttpResponse.text()),
  http.delete('/api/categories/1', async () => HttpResponse.text()),
  http.put('/api/subcategories/45', async () => HttpResponse.text()),
  http.delete('/api/subcategories/46', async () => HttpResponse.text()),
  http.delete('/api/subcategories/45', async () => {
    return HttpResponse.json(
      { message: 'Cannot delete a subcategory that is assigned to patterns' },
      { status: 422 },
    )
  }),
]
const server = setupServer(...handlers)

beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
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
    expect(screen.getByText('ExpenseThreeSub')).toBeDefined()
  })

  // click on a category and edit the name
  await act(async () => {
    fireEvent(
      screen.getByText('IncomeTwo'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )
  })

  let nameInput = await screen.getByLabelText('name')
  expect(nameInput).toBeDefined()

  await act(async () => {
    fireEvent.change(nameInput, { target: { value: 'IncomeThree' } })
    const saveButton = await screen.getByText('Save')
    fireEvent.click(saveButton)
  })

  const categorySavedMessage = await screen.getByText('Category saved')
  expect(categorySavedMessage).toBeDefined()

  // click on a category and delete it
  await act(async () => {
    fireEvent(
      screen.getByText('IncomeOne'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )
  })

  let deleteButton = await screen.getByText('Delete')
  expect(deleteButton).toBeDefined()

  await act(async () => {
    fireEvent.click(deleteButton)
  })

  let confirmDeletedButton = await screen.getByText('Yes, Delete')
  await act(async () => {
    fireEvent.click(confirmDeletedButton)
  })

  const categoryDeletedMessage = await screen.getByText('Category deleted')
  expect(categoryDeletedMessage).toBeDefined()

  // click on a subcategory and edit the name
  await act(async () => {
    fireEvent(
      screen.getByText('IncomeTwoSub'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )
  })

  nameInput = await screen.getByLabelText('name')
  expect(nameInput).toBeDefined()

  await act(async () => {
    fireEvent.change(nameInput, { target: { value: 'IncomeTwoSubTwo' } })
    const saveButton = await screen.getByText('Save')
    fireEvent.click(saveButton)
  })

  const subcategorySavedMessage = await screen.getByText('Subcategory saved')
  expect(subcategorySavedMessage).toBeDefined()

  // click on a subcategory and delete it
  await act(async () => {
    fireEvent(
      screen.getByText('ExpenseThreeSub'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )
  })

  deleteButton = await screen.getByText('Delete')
  expect(deleteButton).toBeDefined()

  await act(async () => {
    fireEvent.click(deleteButton)
  })

  confirmDeletedButton = await screen.getByText('Yes, Delete')
  await act(async () => {
    fireEvent.click(confirmDeletedButton)
  })

  const subcategoryDeletedMessage = await screen.getByText(
    'Subcategory deleted',
  )
  expect(subcategoryDeletedMessage).toBeDefined()

  // failure is reported to user
  await act(async () => {
    fireEvent(
      screen.getByText('IncomeTwoSub'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )
  })

  deleteButton = await screen.getByText('Delete')
  expect(deleteButton).toBeDefined()

  await act(async () => {
    fireEvent.click(deleteButton)
  })

  confirmDeletedButton = await screen.getByText('Yes, Delete')
  await act(async () => {
    fireEvent.click(confirmDeletedButton)
  })

  const deleteFailedMessage = await screen.getByText(
    'Error: Cannot delete a subcategory that is assigned to patterns',
  )
  expect(deleteFailedMessage).toBeDefined()
})
