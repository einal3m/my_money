import {
  transformIncomeExpenseReport,
  transformLoanReport,
  transformMonthTotals,
} from 'transformers/reportTransformer'
import { IncomeExpenseReportResponse, MonthTotalsResponse } from 'types/api'
import { Category, LoanReportResponse, Subcategory } from 'types/models'

describe('ReportTransformer', () => {
  describe('transformLoanReport', () => {
    it('converts loan report response into line chart form', () => {
      const loanReport: LoanReportResponse = {
        minimum_repayment: 1000,
        minimum_amortization: [
          ['2016-01-31', 2345],
          ['2016-02-29', 4567],
        ],
        budget_amortization: [
          ['2016-01-31', 5555],
          ['2016-02-29', 6666],
        ],
      }

      const data = transformLoanReport(loanReport)

      expect(data).toEqual([
        {
          name: 'Minimum Repayments',
          data: [
            [new Date('2016-01-31'), 23.45],
            [new Date('2016-02-29'), 45.67],
          ],
          backgroundColour: '#9467bd',
        },
        {
          name: 'Budget Repayments',
          data: [
            [new Date('2016-01-31'), 55.55],
            [new Date('2016-02-29'), 66.66],
          ],
          backgroundColour: '#17becf',
        },
      ])
    })

    it('returns an empty list when there is no data', () => {
      const loanReport = {
        minimum_amortization: [],
        budget_amortization: [],
      }

      const data = transformLoanReport(loanReport)

      expect(data).toEqual([])
    })
  })

  describe('transformIncomeExpenseReport', () => {
    const categories: Category[] = [
      {
        id: 1,
        name: 'income1',
        categoryTypeId: 1,
      },
      {
        id: 2,
        name: 'expense2',
        categoryTypeId: 2,
      },
      {
        id: 3,
        name: 'expense3',
        categoryTypeId: 2,
      },
    ]

    const subcategories: Subcategory[] = [
      {
        id: 1,
        name: 'subexpense1',
        categoryId: 2,
      },
      {
        id: 2,
        name: 'subexpense2',
        categoryId: 3,
      },
    ]

    const responseData: IncomeExpenseReportResponse = {
      income: {
        subcategory_totals: [],
        category_totals: [
          {
            sum: 5400,
            category_id: null,
          },
        ],
        total: 5400,
      },
      expense: {
        subcategory_totals: [
          {
            sum: -1000,
            category_id: 2,
            subcategory_id: 1,
          },
          {
            sum: -4000,
            category_id: 2,
            subcategory_id: null,
          },
          {
            sum: -1000,
            category_id: 3,
            subcategory_id: 2,
          },
        ],
        category_totals: [
          {
            sum: -5000,
            category_id: 2,
          },
          {
            sum: -1000,
            category_id: 3,
          },
          {
            sum: -4000,
            category_id: null,
          },
        ],
        total: -10000,
      },
    }

    const result = transformIncomeExpenseReport(
      responseData,
      categories,
      subcategories,
    )

    expect(result.pieChartData).toEqual({
      income: { total: 5400, data: [5400], labels: ['Un-assigned'] },
      expense: {
        total: 10000,
        data: [5000, 1000, 4000],
        labels: ['expense2', 'expense3', 'Un-assigned'],
      },
    })

    expect(result.tableData).toEqual({
      income: {
        total: 5400,
        rows: [
          {
            type: 'category',
            categoryId: undefined,
            name: 'Un-assigned',
            amount: 5400,
          },
        ],
      },
      expense: {
        total: -10000,
        rows: [
          {
            type: 'category',
            categoryId: 2,
            name: 'expense2',
            amount: -5000,
          },
          {
            type: 'subcategory',
            categoryId: 2,
            subcategoryId: 1,
            name: 'subexpense1',
            amount: -1000,
          },
          {
            type: 'subcategory',
            categoryId: 2,
            subcategoryId: undefined,
            name: 'Un-assigned',
            amount: -4000,
          },
          {
            type: 'category',
            categoryId: 3,
            name: 'expense3',
            amount: -1000,
          },
          {
            type: 'subcategory',
            categoryId: 3,
            subcategoryId: 2,
            name: 'subexpense2',
            amount: -1000,
          },
          {
            type: 'category',
            categoryId: undefined,
            name: 'Un-assigned',
            amount: -4000,
          },
        ],
      },
    })
  })

  describe('transformIncomeExpenseReport with no data', () => {
    const categories: Category[] = []
    const subcategories: Subcategory[] = []
    const responseData: IncomeExpenseReportResponse = {
      income: {
        subcategory_totals: [],
        category_totals: [],
        total: 0,
      },
      expense: {
        subcategory_totals: [],
        category_totals: [],
        total: 0,
      },
    }

    const result = transformIncomeExpenseReport(
      responseData,
      categories,
      subcategories,
    )

    expect(result.pieChartData).toEqual({
      income: { total: 0, data: [], labels: [] },
      expense: { total: 0, data: [], labels: [] },
    })

    expect(result.tableData).toEqual({
      income: {
        total: 0,
        rows: [],
      },
      expense: {
        total: 0,
        rows: [],
      },
    })
  })

  describe('transformMonthTotals', () => {
    it('converts month totals into seriesData', () => {
      const totals: MonthTotalsResponse[] = [
        ['Aug-16', 4560],
        ['Sep-16', 1234],
      ]

      const seriesData = [
        {
          name: 'Total',
          data: [4560, 1234],
          backgroundColour: '#61ABDB',
          borderColor: 'maroon',
        },
      ]
      const xAxisLabels = ['Aug-16', 'Sep-16']
      const chartData = { seriesData, xAxisLabels }

      expect(transformMonthTotals(totals)).toEqual(chartData)
    })
  })
})
