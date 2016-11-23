import React from 'react';
import PageHeader from '../common/page-header';
import D3Chart from './d3-bar-chart';

require('../../../css/common.scss');
require('../../../css/report.scss');


const IncomeVsExpenseBarChart = () => {
  const seriesData = [
    { name: 'Actual', data: [400, 2300, -1000, -1005, -2345], backgroundColour: '#61ABDB', borderColor: 'maroon' },
    { name: 'Last Year', data: [4300, 2300, 1000, -1500, -2345], backgroundColour: '#FDCA3A', borderColor: 'maroon' },
    { name: 'Budget', data: [2500, -2300, -3330, -1500, 10], backgroundColour: '#80D8C4', borderColor: 'maroon' },
  ];

  const xAxisLabels = ['Feb-15', 'Mar-15', 'Apr-15', 'May-15', 'Jun-15'];

  const chartData = { seriesData, xAxisLabels };

  return (
    <div>
      <PageHeader title="Income vs Expenses" />

      <div id="report" className="container">
        <D3Chart chartData={chartData} />
      </div>

    </div>
  );
};

export default IncomeVsExpenseBarChart;
