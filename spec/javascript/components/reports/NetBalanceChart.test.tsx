import React from 'react'
import { act, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { expect, test, beforeAll, afterEach, afterAll } from 'vitest'
import selectEvent from 'react-select-event'

import store from 'stores/store'
import { dateRangesMock } from 'mocks/dateRangeMocks'
import { netBalanceMock1, netBalanceMock2 } from 'mocks/reportMocks'
import NetBalanceChart from 'components/reports/NetBalanceChart'

const handlers = [
  http.get('/api/date_range_options', async () => {
    return HttpResponse.json(dateRangesMock)
  }),
  http.get('/api/report/net_balance', async ({ request }) => {
    const params = new URL(request.url).searchParams
    const fromDate = params.get('from_date')
    const toDate = params.get('to_date')

    if (fromDate == '2023-03-01' && toDate == '2023-03-08') {
      return HttpResponse.json(netBalanceMock1)
    }

    if (fromDate == '2023-04-11' && toDate == '2023-04-18') {
      return HttpResponse.json(netBalanceMock2)
    }
  }),
]
const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders the net balance chart', async () => {
  render(
    <Provider store={store}>
      <NetBalanceChart />
    </Provider>,
  )

  // page header
  const pageTitle = screen.getByRole('heading', { level: 1 })
  expect(pageTitle.textContent).toEqual('Net Balance Report')

  await waitFor(() => {
    // date range filter
    expect(screen.getByText('Today')).toBeDefined()

    // chart
    const svg = screen.getByTestId('d3-line-chart')
    expect(svg.getElementsByTagName('g').length).toEqual(23)

    // chart x labels
    expect(screen.getByText('01-Mar-23')).toBeDefined()
    expect(screen.getByText('02-Mar-23')).toBeDefined()
    expect(screen.getByText('03-Mar-23')).toBeDefined()
    expect(screen.getByText('04-Mar-23')).toBeDefined()
    expect(screen.getByText('05-Mar-23')).toBeDefined()
    expect(screen.getByText('06-Mar-23')).toBeDefined()
    expect(screen.getByText('07-Mar-23')).toBeDefined()
    expect(screen.getByText('08-Mar-23')).toBeDefined()
  })

  // select a different date range
  act(() => {
    selectEvent.select(screen.getByLabelText('Dates'), ['Custom Dates'])
  })

  await waitFor(() => {
    // chart
    const svg = screen.getByTestId('d3-line-chart')
    expect(svg.getElementsByTagName('g').length).toEqual(22)

    // chart x labels
    expect(screen.getByText('11-Apr-23')).toBeDefined()
    expect(screen.getByText('12-Apr-23')).toBeDefined()
    expect(screen.getByText('13-Apr-23')).toBeDefined()
    expect(screen.getByText('14-Apr-23')).toBeDefined()
    expect(screen.getByText('15-Apr-23')).toBeDefined()
    expect(screen.getByText('16-Apr-23')).toBeDefined()
  })
})
