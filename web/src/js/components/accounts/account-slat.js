import React, { PropTypes } from 'react';
import Balance from '../common/balance';
import AccountActionButtons from './account-action-buttons';
import { routeToTransactions } from '../../actions/routing-actions';

require('../../../css/common.scss');
require('../../../images/piggy-bank.gif');

export default class AccountSlat extends React.Component {

  renderSlatImage = (accountType) => {
    if (accountType === 'savings') {
      return (
        <img src={require('../../../images/piggy-bank.gif')} height={35} width={35} />
      );
    } else {
      return (
        <span className="fa-stack fa-lg">
          <i className="fa fa-circle fa-stack-2x" />
          <i className="fa fa-bank fa-stack-1x fa-inverse" />
        </span>
      );
    }
  };

  viewTransactions = () => {
    routeToTransactions(this.props.account.id);
  };

  renderName() {
    return <a className="name-link" onClick={this.viewTransactions.bind(this)}><h4>{this.props.account.name}</h4></a>;
  }

  render() {
    return (
      <li className="slat-item">
        <div className="row">
          <div className="slat-icon col-sm-1 col-xs-2">
            {this.renderSlatImage(this.props.account.accountType)}
          </div>
          <div className="slat-detail col-sm-11 col-xs-10">
            <div className="row">
              <div className="col-xs-4 col-sm-6">
                {this.renderName()}
                <span className="text-muted">{this.props.account.bank}</span>
              </div>
              <div className="currency balance col-xs-4 col-sm-5">
                <Balance balance={this.props.account.currentBalance} />
              </div>
              <div className="slat-icon col-xs-4 col-sm-1">
                <AccountActionButtons account={this.props.account} />
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

AccountSlat.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.number.isRequired,
    accountType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bank: PropTypes.string,
    currentBalance: PropTypes.number.isRequired,
  }),
};

