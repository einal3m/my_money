import React from 'react';
import PageHeader from '../common/page-header';
import D3PieChart from './d3-pie-chart';

const IncomeVsExpensesReport = () => (
  <div>
    <PageHeader title="Income vs Expenses" />
    <div id="report" className="container">
      <D3PieChart />
    </div>
  </div>
);

export default IncomeVsExpensesReport;
