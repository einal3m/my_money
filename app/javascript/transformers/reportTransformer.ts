import { centsToDollars } from 'util/moneyUtil'
import {
  LoanReportResponse,
  Point,
  PointResponse,
  SeriesData,
} from 'types/models'

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
