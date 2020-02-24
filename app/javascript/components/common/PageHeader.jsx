import React from 'react';
import PropTypes from 'prop-types';
import Sticky from 'react-sticky-el';
import ApiStatus from '../../util/api-status';
import apiStatusActions from '../../actions/api-status-actions';

import '../../stylesheets/common.scss';

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
              <i className="fa fa-times-circle click-me" onClick={this.clearError} />
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
      <Sticky className="sticky">
        <div className="page-title">
          <div className="title-group">
            <div className="title"><h1>{this.props.title}</h1></div>
            <span className="status">{this.renderStatus()}</span>
          </div>
          <div className="button-group">
            {this.props.children}
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
