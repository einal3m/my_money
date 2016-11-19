import React, { PropTypes } from 'react';
import Sticky from 'react-stickydiv';
import ApiStatus from '../../util/api-status';
import apiStatusActions from '../../actions/api-status-actions';

require('../../../css/common.scss');

export default class PageTitle extends React.Component {

  clearError = () => {
    apiStatusActions.clearApiError();
  };

  renderStatus() {
    if (this.props.apiStatus) {
      switch (this.props.apiStatus.status) {
        case ApiStatus.LOADING:
          return 'Loading...';
        case ApiStatus.SAVING:
          return 'Saving...';
        case ApiStatus.DELETING:
          return 'Deleting...';
        case ApiStatus.ERROR:
          return (
            <span className="error">
              Error: {this.props.apiStatus.message}
              <i className="fa fa-times-circle" ref="clearError" onClick={this.clearError} />
            </span>
          );
        default:
          return undefined;
      }
    }
    return '';
  }

  render() {
    return (
      <Sticky zIndex={999}>
        <div className="page-title">
          <div className="container">
            <div className="row">
              <div className="title col-xs-8">
                <div className="inline-heading"><h1>{this.props.title}</h1></div>
                <span className="status">{this.renderStatus()}</span>
              </div>
              <div className="button-group col-xs-4">
                <div className="pull-right">
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sticky>
    );
  }
}

PageTitle.propTypes = {
  apiStatus: PropTypes.shape({
    status: PropTypes.string,
    message: PropTypes.string,
  }),
  title: PropTypes.string,
  children: PropTypes.node,
};
