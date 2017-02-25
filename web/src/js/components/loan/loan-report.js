import React, { PropTypes } from 'react';
import PageHeader from '../common/page-header';

export default class LoanReport extends React.Component {
  render() {
    return (
      <div>
        <PageHeader title="loan report" apiStatus={this.props.apiStatus} />
      </div>
    );
  }
}

LoanReport.propTypes = {
  apiStatus: PropTypes.shape({}),
};
