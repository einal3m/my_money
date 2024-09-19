import { transformLoanReport } from 'transformers/reportTransformer'
import { LoanReportResponse } from 'types/models'

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
})
