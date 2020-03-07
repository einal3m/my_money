import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleReportView } from '../../../actions/report-actions';

export const ReportViewButtonsComponent = (props) => {
  const disabled = viewType => viewType === props.viewType ? true : false;

  return (
    <div className="button-group" role="group">
      <button id="chartButton" className="btn btn-primary" disabled={disabled('chart')} onClick={toggleReportView}>
        <i className="fa fa-bar-chart" />
      </button>
      <button id="tableButton" className="btn btn-primary" disabled={disabled('table')} onClick={toggleReportView}>
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

