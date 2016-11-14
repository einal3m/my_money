import React from 'react';
import PageHeader from '../common/page-header';
import D3PieChart from './d3-pie-chart';

export default class SubcategoryReport extends React.Component {
  render() {
    return (
      <div>
        <PageHeader title="subcategory report" />
        <div id="report" className="container">
          <D3PieChart />
        </div>
      </div>
    );
  }
}
