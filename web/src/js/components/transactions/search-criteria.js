import React from 'react';
import { connect } from 'react-redux';

import accountActions from '../../actions/account-actions';
import { getTransactions, setSearchDescription, toggleMoreOrLess } from '../../actions/transaction-actions';
import dateRangeActions from '../../actions/date-range-actions';
import accountSelector from '../../selectors/account-selector';

import AccountFilter from '../common/criteria/account-filter';
import DateRangeFilter from '../common/criteria/date-range-filter';
import DescriptionFilter from '../common/description-filter';
import { Glyphicon } from 'react-bootstrap';
require('../../../css/transaction.scss');

export class SearchCriteria extends React.Component {

  constructor() {
    super();
    this.fetch();
  }

  onAccountChange(accountId) {
    accountActions.setCurrentAccount(accountId);
    this.fetch();
  }

  onDateRangeChange(data) {
    if (data.id) {
      dateRangeActions.setCurrentDateRange(data.id);
      const newDateRange = this.props.dateRanges.filter(dateRange => dateRange.id === data.id)[0];
      this.fetch();
    } else if (data.fromDate) {
      dateRangeActions.updateCurrentDateRange({ fromDate: data.fromDate });
      this.fetch();
    } else if (data.toDate) {
      dateRangeActions.updateCurrentDateRange({ toDate: data.toDate });
      this.fetch();
    }
  }

  onDescriptionChange = (description) => {
    setSearchDescription(description);
    this.fetch();
  };

  onToggleMoreOrLess = () => {
    toggleMoreOrLess();
    this.fetch();
  };

  fetch = () => {
    getTransactions();
  };

  renderStaticCriteria() {
    return [
      <AccountFilter key="1" fetch={this.fetch} />,
      <DateRangeFilter key="2" fetch={this.fetch} />,
    ];
  }

  renderOptionToggle() {
    return (
      <div key="3" className="row">
        <div ref="optionToggle" onClick={this.onToggleMoreOrLess.bind(this)} className="more-or-less pull-right">
          {this.renderMoreOrLess()}
        </div>
      </div>
    );
  }

  renderMoreOrLess() {
    if (this.props.moreOptions) {
      return <span>less <Glyphicon glyph="triangle-top" /></span>;
    } else {
      return <span>more <Glyphicon glyph="triangle-bottom" /></span>;
    }
  }

  renderMoreCriteria() {
    if (this.props.moreOptions) {
      return (
        <DescriptionFilter key="4" description={this.props.searchDescription}
          onChange={this.onDescriptionChange.bind(this)}
        />
      );
    }
  }

  renderCriteria() {
    if (this.props.loaded) {
      return [
        this.renderStaticCriteria(),
        this.renderOptionToggle(),
        this.renderMoreCriteria(),
      ];
    }
  }

  render() {
    return (
      <div id="search-criteria">
        {this.renderCriteria()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loaded: state.accountStore.get('loaded') && state.dateRangeStore.get('loaded'),
    accountGroups: accountSelector(state),
    accountTypes: state.accountStore.get('accountTypes'),
    currentAccount: state.accountStore.get('currentAccount'),
    dateRanges: state.dateRangeStore.get('dateRanges'),
    currentDateRange: state.dateRangeStore.get('currentDateRange'),
    searchDescription: state.transactionStore.get('searchDescription'),
    moreOptions: state.transactionStore.get('moreOptions'),
  };
}

export default connect(mapStateToProps)(SearchCriteria);
