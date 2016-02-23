'use strict';
import React from 'react';
import ApiStatus from '../../util/api-status';
import apiStatusActions from '../../actions/api-status-actions';
require("../../../css/common.scss");

export default class PageTitle extends React.Component {

  clearError() {
    apiStatusActions.clearApiError();
  }

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
            <span className='error'>
              Error: {this.props.apiStatus.message}
              <i className='fa fa-times-circle' ref='clearError' onClick={this.clearError}/>
            </span>
          );
      }
    }
  }

  render() {
    return (
      <div className="page-title">
        <div className="container">
          <div className="row">
            <div className="title col-xs-8">
              <div className="inline-heading"><h1>{this.props.title}</h1></div>
              <span className='status'>{this.renderStatus()}</span>
            </div>
            <div className="button-group col-xs-4">
              <div className="pull-right">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}