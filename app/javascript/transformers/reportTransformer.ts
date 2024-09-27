import { centsToDollars } from 'util/moneyUtil'
import {
  Category,
  IncomeExpencePieChart,
  TableData,
  LoanReportResponse,
  PieChartData,
  Point,
  PointResponse,
  Subcategory,
  TableRow,
  BarChartData,
  AccountBalanceReport,
  LineSeriesData,
  DoublePointResponse,
} from 'types/models'
import {
  AccountBalanceReportResponse,
  IncomeExpenseReportResponse,
  MonthTotals,
  ReportTotalsResponse,
} from 'types/api'

export const transformLoanReport = (
  loanReport: LoanReportResponse,
): LineSeriesData[] => {
  if (!loanReport.minimum_repayment) return []

  return [
    convertAmortization(
      loanReport.minimum_amortization,
      'Minimum Repayments',
      '#9467bd',
    ),
    convertAmortization(
      loanReport.budget_amortization,
      'Budget Repayments',
      '#17becf',
    ),
  ]
}

function convertAmortization(
  balances: PointResponse[],
  name: string,
  backgroundColour: string,
) {
  const data: Point[] = balances.map((balance) => [
    new Date(balance[0]),
    centsToDollars(balance[1]),
  ])

  return {
    name,
    data,
    backgroundColour,
  }
}

export const transformIncomeExpenseReport = (
  reportData: IncomeExpenseReportResponse,
  categories: Category[],
  subcategories: Subcategory[],
): { pieChartData: IncomeExpencePieChart; tableData: any } => {
  return {
    pieChartData: {
      income: pieChartData(reportData.income, categories, 1),
      expense: pieChartData(reportData.expense, categories, -1),
    },
    tableData: {
      income: tableData(reportData.income, categories, subcategories),
      expense: tableData(reportData.expense, categories, subcategories),
    },
  }
}

const pieChartData = (
  reportData: ReportTotalsResponse,
  categories: Category[],
  factor: number,
): PieChartData => {
  const data: number[] = []
  const labels: string[] = []

  if (reportData.category_totals.length == 0) {
    return {
      data: [],
      labels: [],
      total: 0,
    }
  }

  reportData.category_totals.forEach((totals) => {
    data.push(totals.sum * factor)
    labels.push(
      categories.find((c) => c.id == totals.category_id)?.name || 'Un-assigned',
    )
  })

  return {
    data,
    labels,
    total: reportData.total * factor,
  }
}

const tableData = (
  reportData: ReportTotalsResponse,
  categories: Category[],
  subcategories: Subcategory[],
): TableData => {
  const rows: TableRow[] = []

  reportData.category_totals.forEach((ct) => {
    let unassigned = ct.sum

    rows.push({
      type: 'category',
      categoryId: ct.category_id || undefined,
      name:
        categories.find((c) => c.id == ct.category_id)?.name || 'Un-assigned',
      amount: ct.sum,
    })

    reportData.subcategory_totals
      .filter((sc) => sc.category_id == ct.category_id)
      .forEach((sc) => {
        rows.push({
          type: 'subcategory',
          categoryId: ct.category_id || undefined,
          subcategoryId: sc.subcategory_id || undefined,
          name:
            subcategories.find((s) => s.id == sc.subcategory_id)?.name ||
            'Un-assigned',
          amount: sc.sum,
        })
        unassigned -= sc.sum
      })
  })

  return {
    total: reportData.total,
    rows: rows,
  }
}

export const transformMonthTotals = (
  monthTotals: MonthTotals[],
): BarChartData => {
  const xAxisLabels = monthTotals.map((month) => month[0])
  const data = monthTotals.map((month) => month[1])

  return {
    seriesData: [
      {
        name: 'Total',
        data,
        backgroundColour: '#61ABDB',
        borderColor: 'maroon',
      },
    ],
    xAxisLabels,
  }
}

export const transformAccountBalances = (
  accountBalances: AccountBalanceReportResponse[] | undefined,
): AccountBalanceReport | undefined => {
  const result: AccountBalanceReport = {}
  if (!accountBalances) {
    return undefined
  }

  accountBalances.forEach((ac, index) => {
    result[ac.account_id.toString()] = ac.report.map((data) => [
      new Date(data[0]),
      centsToDollars(data[1]),
    ])
  })

  return result
}

export const chartDataForCombo = (
  monthTotals: DoublePointResponse[],
): BarChartData | null => {
  if (monthTotals.length === 0) return null
  if (monthTotals[0].length !== 3) return null

  const xAxisLabels = monthTotals.map((month) => month[0])
  const incomeData = monthTotals.map((month) => month[1])
  const expenseData = monthTotals.map((month) => month[2])

  return {
    xAxisLabels,
    seriesData: [
      { name: 'Income', data: incomeData, backgroundColour: '#66CC66' },
      { name: 'Expense', data: expenseData, backgroundColour: '#FF6666' },
    ],
  }
}
