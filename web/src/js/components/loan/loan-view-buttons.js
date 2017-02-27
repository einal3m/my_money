import React, { PropTypes } from 'react';
import { setLoanView } from '../../actions/loan-actions';

const LoanViewButtons = (props) => {
  const className = view => view === props.view ? ' active' : '';
  const setChartView = () => setLoanView('chart');
  const setBudgetView = () => setLoanView('budget');
  const setSummaryView = () => setLoanView('summary');

  return (
    <div className="btn-group" role="group">
      <button className={`btn btn-default${className('chart')}`} onClick={setChartView}>
        <i className="fa fa-line-chart" />
      </button>
      <button className={`btn btn-default${className('budget')}`} onClick={setBudgetView}>
        <i className="fa fa-table" />
      </button>
      <button className={`btn btn-default${className('summary')}`} onClick={setSummaryView}>
        <i className="fa fa-dollar" />
      </button>
    </div>
  );
};

LoanViewButtons.propTypes = {
  view: PropTypes.string.isRequired,
};

export default LoanViewButtons;
