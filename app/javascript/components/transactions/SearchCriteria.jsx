import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Glyphicon } from 'react-bootstrap';
import { getTransactions, setSearchDescription, toggleMoreOrLess } from '../../actions/transaction-actions';
import AccountFilter from '../common/criteria/account-filter';
import DateRangeFilter from '../common/criteria/date-range-filter';
import DescriptionFilter from '../common/description-filter';

require('../../../css/transaction.scss');

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

  renderStaticCriteria() {
    return [
      <AccountFilter key="1" fetch={this.fetch} />,
      <DateRangeFilter key="2" fetch={this.fetch} />,
    ];
  }

  renderOptionToggle() {
    return (
      <div key="3" className="row">
        <div onClick={this.onToggleMoreOrLess} className="more-or-less pull-right">
          {this.renderMoreOrLess()}
        </div>
      </div>
    );
  }

  renderMoreOrLess() {
    if (this.props.moreOptions) {
      return <span>less <Glyphicon glyph="triangle-top" /></span>;
    }
    return <span>more <Glyphicon glyph="triangle-bottom" /></span>;
  }

  renderMoreCriteria() {
    if (this.props.moreOptions) {
      return (
        <DescriptionFilter
          key="4"
          description={this.props.searchDescription}
          onChange={this.onDescriptionChange}
        />
      );
    }
    return undefined;
  }

  renderCriteria() {
    if (this.props.loaded) {
      return [
        this.renderStaticCriteria(),
        this.renderOptionToggle(),
        this.renderMoreCriteria(),
      ];
    }
    return undefined;
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
