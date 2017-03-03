import { Map, fromJS } from 'immutable';
import seriesData from '../loan-report-selector';

describe('LoanReportSelector', () => {
  it('converts loan report response into line chart form', () => {
    const loanReport = {
      minimumRepaymentBalances: [['2016-01-31', 2345], ['2016-02-29', 4567]],
      budgetRepaymentBalances: [['2016-01-31', 5555], ['2016-02-29', 6666]],
    };

    const data = seriesData({ loanStore: fromJS(loanReport) });

    expect(data.toJS()).toEqual([
      {
        name: 'Minimum Repayments',
        data: [[new Date('2016-01-31'), 23.45], [new Date('2016-02-29'), 45.67]],
        backgroundColour: '#9467bd',
      },
      {
        name: 'Budget Repayments',
        data: [[new Date('2016-01-31'), 55.55], [new Date('2016-02-29'), 66.66]],
        backgroundColour: '#17becf',
      },
    ]);
  });

  it('returns an empty list when there is no data', () => {
    const data = seriesData({ loanStore: Map({ minimumRepayment: null }) });

    expect(data.toJS()).toEqual([]);
  });
});
