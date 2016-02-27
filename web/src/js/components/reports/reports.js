import React from 'react';
import PageHeader from '../common/page-header';
import D3Chart from './d3-chart';
require("../../../css/common.scss");
require("../../../css/report.scss");

export default class Reports extends React.Component {

  render() {
    return (
      <div>
        <PageHeader title='reports' />

        <div id='report-list' className="container">
          <D3Chart />
        </div>

      </div>
    );
  }
}
