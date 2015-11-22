'use strict';
import React from 'react';
require("../../../css/common.scss");
require('../../../images/piggy-bank.gif');

export default class AccountSlat extends React.Component {
  renderSlatImage(accountType) {
    if (accountType === 'savings') {
      return (
        <img src={require("../../../images/piggy-bank.gif")} height={35} width={35} />
      );
    } else {
      return (
        <span className="fa-stack fa-lg">
          <i className="fa fa-circle fa-stack-2x"></i>
          <i className="fa fa-bank fa-stack-1x fa-inverse"></i>
        </span>
      );
    }
  }

  render() {
    return (
      <li className='slat-item'>
        <div className="row">
          <div className="slat-icon col-sm-1 col-xs-2">
            {this.renderSlatImage(this.props.account.accountType)}
          </div>
          <div className="slat-detail col-sm-11 col-xs-10">
            <div className="row">
              <div className="col-xs-6">
                <h4>{this.props.account.name}</h4>
                <span className="text-muted">{this.props.account.bank}</span>
              </div>
              <div className="currency col-xs-6">
                <h3>{`$${this.props.account.currentBalance}`}</h3>
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
    currentBalance: React.PropTypes.number.isRequired
  })
};

