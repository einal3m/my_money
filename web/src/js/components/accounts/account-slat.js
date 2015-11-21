'use strict';
import React from 'react';
require("../../../css/common.scss");

export default class AccountSlat extends React.Component {
  render() {
    return (
      <li className='slat-item'>
        <div className="row">
          <div className="slat-icon col-sm-1 col-xs-2">
            <span className="fa-stack fa-lg">
              <i className="fa fa-circle fa-stack-2x"></i>
              <i className="fa fa-bank fa-stack-1x fa-inverse"></i>
            </span>
          </div>
          <div className="slat-detail col-sm-11 col-xs-10">
            <div className="row">
              <div className="col-xs-6">
                <h4>{this.props.account.name}</h4>
                <span className="text-muted">{this.props.account.bank}</span>
              </div>
              <div className="currency col-xs-6">
                <h3>{`$${this.props.account.current_balance}`}</h3>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

AccountSlat.propTypes = {
  account: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    bank: React.PropTypes.string,
    current_balance: React.PropTypes.number.isRequired
  })
};