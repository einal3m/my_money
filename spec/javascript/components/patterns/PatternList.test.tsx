import React from 'react'
import store from 'stores/store'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
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
  http.get('/api/account_types', async () =>
    HttpResponse.json(accountTypesMock),
  ),
  http.get('/api/accounts', async () => HttpResponse.json(accountsMock)),
  http.get('/api/category_type2', async () =>
    HttpResponse.json(categoryTypesMock),
  ),
  http.get('/api/categories', async () => HttpResponse.json(categoriesMock)),
  http.get('/api/subcategories', async () =>
    HttpResponse.json(subcategoriesMock),
  ),
  http.get('/api/accounts/1/patterns', async () =>
    HttpResponse.json(patternsAccount1),
  ),
  http.put('/api/accounts/1/patterns/2', async () => HttpResponse.text()),
  http.delete('/api/accounts/1/patterns/1', async () => HttpResponse.text()),
  http.post('/api/accounts/1/patterns', async () => HttpResponse.text()),
]
const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders a list of patterns', async () => {
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

  // click on a pattern and edit the notes
  await act(async () => {
    fireEvent(
      screen.getByText('Bunnings'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )
  })

  let noteInput = await screen.getByLabelText('Notes')
  expect(noteInput).toBeDefined()
  let saveButton = await screen.getByText('Save')

  await act(async () => {
    fireEvent.change(noteInput, { target: { value: 'plants' } })
    fireEvent.click(saveButton)
  })

  const patternSavedMessage = await screen.getByText('Pattern saved')
  expect(patternSavedMessage).toBeDefined()

  // click on a pattern and delete it
  await act(async () => {
    fireEvent(
      screen.getByText('payment'),
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

  const patternDeletedMessage = await screen.getByText('Pattern deleted')
  expect(patternDeletedMessage).toBeDefined()

  // create a new pattern
  await act(async () => {
    fireEvent(
      screen.getByText('New'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )
  })

  const matchTextInput = await screen.getByLabelText('Match Text')
  expect(matchTextInput).toBeDefined()
  noteInput = await screen.getByLabelText('Notes')
  expect(noteInput).toBeDefined()
  saveButton = await screen.getByText('Save')

  await act(async () => {
    fireEvent.change(matchTextInput, { target: { value: 'McDonalds' } })
    fireEvent.change(noteInput, { target: { value: 'lunch' } })
    fireEvent.click(saveButton)
  })

  const validationMessage = await screen.getByText('Category is required')
  expect(validationMessage).toBeDefined()

  const categorySelect = await screen.getAllByRole('combobox')[1]
  await act(async () => {
    fireEvent.focus(categorySelect)
    fireEvent.keyDown(categorySelect, {
      key: 'ArrowDown',
      keyCode: 40,
      code: 40,
    })
  })

  const expenseOption = await screen.getByText('ExpenseThree')
  expect(expenseOption).toBeDefined()
  await act(async () => {
    fireEvent.click(expenseOption)
    fireEvent.click(saveButton)
  })

  const patternCreatedMessage = await screen.getByText('Pattern saved')
  expect(patternCreatedMessage).toBeDefined()
})
