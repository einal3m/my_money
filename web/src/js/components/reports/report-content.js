import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export class ReportContentComponent extends React.Component {

  renderTableOrChart() {
    if (this.props.viewType === 'chart') {
      return (
        <div>this is a chart</div>
      );
    }
    return <div>this is a table</div>;
  }

  render() {
    return (
      <div>
        {this.renderTableOrChart()}
      </div>
    );
  }
}

ReportContentComponent.propTypes = {
  viewType: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    viewType: state.reportStore.get('viewType'),
  };
}

export default connect(mapStateToProps)(ReportContentComponent);
