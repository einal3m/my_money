import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTransactions, setSearchDescription, toggleMoreOrLess } from '../../actions/transaction-actions';
import CommonSearchCriteria, { ACCOUNT_FILTER, DATE_RANGE_FILTER } from '../common/criteria/SearchCriteria';
import AccountFilter from '../common/criteria/AccountFilter';
import DateRangeFilter from '../common/criteria/DateRangeFilter';
import DescriptionFilter from '../common/DescriptionFilter';

import '../../stylesheets/transaction.scss';

export class SearchCriteriaComponent extends React.Component {

  constructor() {
    super();
    this.fetch();
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

  renderMoreOptions() {
    return (
      <div className="more-options">
        <div onClick={this.onToggleMoreOrLess} className="more-or-less click-me">
          {this.renderMoreOrLess()}
        </div>
        {this.renderDescriptionFilter()}
      </div>
    );
  }

  renderMoreOrLess() {
    if (this.props.moreOptions) {
      return (
        <span>less options <i className="fas fa-caret-up" /></span>
      );
    }
    return <span>more options <i className="fas fa-caret-down" /></span>;
  }

  renderDescriptionFilter() {
    if (this.props.moreOptions) {
      return (
        <DescriptionFilter
            description={this.props.searchDescription}
            onChange={this.onDescriptionChange}
        />
      );
    }

    return <div></div>;
  }

  render() {
    if (this.props.loaded) {
      return (
        <React.Fragment>
          <CommonSearchCriteria 
            filters={[
                { name: ACCOUNT_FILTER, options: { multiple: false } },
                { name: DATE_RANGE_FILTER }
              ]}
            fetch={this.fetch}
          />
          {this.renderMoreOptions()}
        </React.Fragment>
      );
    }
    return <div></div>;
  }
}

function mapStateToProps(state) {
  return {
    loaded: state.accountStore.get('loaded') && state.dateRangeStore.get('loaded'),
    searchDescription: state.transactionStore.get('searchDescription'),
    moreOptions: state.transactionStore.get('moreOptions'),
  };
}

SearchCriteriaComponent.propTypes = {
  loaded: PropTypes.bool.isRequired,
  searchDescription: PropTypes.string,
  moreOptions: PropTypes.bool,
};

export default connect(mapStateToProps)(SearchCriteriaComponent);
