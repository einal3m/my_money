'use strict';
import React from 'react';
require("../../../css/common.scss");

export default class PageTitle extends React.Component {
  render() {
    return (
      <div className="page-title">
        <div className="container">
          <div className="row">
            <div className="title col-xs-6">
              <h1>{this.props.title}</h1>
            </div>
            <div className="button-group col-xs-6">
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