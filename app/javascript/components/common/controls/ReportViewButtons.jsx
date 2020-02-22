import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleReportView } from '../../../actions/report-actions';

export const ReportViewButtonsComponent = (props) => {
  const className = viewType => viewType === props.viewType ? ' active' : '';

  return (
    <div className="btn-group" role="group">
      <button id="chartButton" className={`btn btn-default${className('chart')}`} onClick={toggleReportView}>
        <i className="fa fa-bar-chart" />
      </button>
      <button id="tableButton" className={`btn btn-default${className('table')}`} onClick={toggleReportView}>
        <i className="fa fa-table" />
      </button>
    </div>
  );
};

ReportViewButtonsComponent.propTypes = {
  viewType: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    viewType: state.reportStore.get('viewType'),
  };
}

export default connect(mapStateToProps)(ReportViewButtonsComponent);

