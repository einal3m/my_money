import React from 'react';
import PageHeader from '../common/page-header';
import D3LineChart from './d3-line-chart';
require("../../../css/common.scss");
require("../../../css/report.scss");

export default class AccountBalanceReport extends React.Component {

  render() {

    let seriesData = [
      {name: 'Home Loan', data:
        [['2015-01-01', 400], ['2015-01-02', 2300], ['2015-01-05', -1000], ['2015-01-15', -1005], ['2015-02-10', -2345]],
        backgroundColour: '#61ABDB'
      },
      {name: 'Savings', data:
        [['2015-01-04', 500], ['2015-01-15', 2200], ['2015-01-16', -900], ['2015-01-20', -1005], ['2015-02-05', 25]],
        backgroundColour: '#FDCA3A'
      },
      {name: 'Net Worth', data:
        [['2015-01-02', 600], ['2015-01-10', 230], ['2015-01-16', 300], ['2015-01-21', 450], ['2015-02-15', 500]],
        backgroundColour: '#80D8C4'}
    ];

    let chartData = {seriesData: seriesData};

    return (
      <div>
        <PageHeader title='Account Balance' />

        <div id='report' className="container">
          <D3LineChart chartData={chartData} />
        </div>

      </div>
    );
  }
}
