import React, { PropTypes } from 'react';
import { setLoanView } from '../../actions/loan-actions';

export default class LoanViewButtons extends React.Component {

  className = view => view === this.props.view ? ' active' : '';
  setChartView = () => setLoanView('chart');
  setBudgetView = () => setLoanView('budget');
  setSummaryView = () => setLoanView('summary');

  render() {
    return (
      <div className="btn-group" role="group">
        <button className={`btn btn-default${this.className('chart')}`} onClick={this.setChartView}>
          <i className="fa fa-line-chart" />
        </button>
        <button className={`btn btn-default${this.className('budget')}`} onClick={this.setBudgetView}>
          <i className="fa fa-table" />
        </button>
        <button className={`btn btn-default${this.className('summary')}`} onClick={this.setSummaryView}>
          <i className="fa fa-dollar" />
        </button>
      </div>
    );
  }
}

LoanViewButtons.propTypes = {
  view: PropTypes.string.isRequired,
};
