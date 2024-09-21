import { centsToDollars } from 'util/moneyUtil'
import {
  Category,
  IncomeExpencePieChart,
  TableData,
  LoanReportResponse,
  PieChartData,
  Point,
  PointResponse,
  SeriesData,
  Subcategory,
  TableRow,
} from 'types/models'
import { IncomeExpenseReportResponse, ReportTotalsResponse } from 'types/api'

export const transformLoanReport = (
  loanReport: LoanReportResponse,
): SeriesData[] => {
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
      total: 0
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

  reportData.category_totals.forEach(ct => {
    let unassigned = ct.sum

    rows.push({
      type: 'category',
      categoryId: ct.category_id || undefined,
      name: categories.find(c => c.id == ct.category_id)?.name || "Un-assigned",
      amount: ct.sum
    })

    reportData.subcategory_totals.filter(sc => sc.category_id == ct.category_id).forEach(sc => {
      rows.push({
        type: 'subcategory',
        categoryId: ct.category_id || undefined,
        subcategoryId: sc.subcategory_id || undefined,
        name: subcategories.find(s => s.id == sc.subcategory_id)?.name || "Un-assigned",
        amount: sc.sum
      })
      unassigned -= sc.sum
    })
  })

  return {
    total: reportData.total,
    rows: rows,
  }
}
