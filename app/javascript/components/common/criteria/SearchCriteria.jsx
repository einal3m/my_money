import React from 'react';
import PropTypes from 'prop-types';
import AccountFilter from './AccountFilter';
import DateRangeFilter from './DateRangeFilter';
import CategoryFilter from './CategoryFilter';

export const DATE_RANGE_FILTER = 'DATE_RANGE_FILTER';
export const ACCOUNT_FILTER = 'ACCOUNT_FILTER';
export const CATEGORY_FILTER = 'CATEGORY_FILTER';

import '../../../stylesheets/search-criteria.scss';

export default class SearchCriteria extends React.Component {

  allowMultipleAccounts = options => options ? options.multiple : false;

  showSubcategories = options => options ? options.showSubcategories : false;

  renderFilter(name, options) {
    switch (name) {
      case DATE_RANGE_FILTER:
        return <DateRangeFilter key={DATE_RANGE_FILTER} fetch={this.props.fetch} />;
      case ACCOUNT_FILTER:
        return (
          <AccountFilter
            key={ACCOUNT_FILTER}
            multiple={this.allowMultipleAccounts(options)}
            fetch={this.props.fetch}
          />
        );
      case CATEGORY_FILTER:
        return (
          <CategoryFilter
            key={CATEGORY_FILTER}
            fetch={this.props.fetch}
            showSubcategories={this.showSubcategories(options)}
          />
        );
      default:
        return <div />;
    }
  }

  renderCriteria() {
    return this.props.filters.map(filter => this.renderFilter(filter.name, filter.options));
  }

  render() {
    return (
      <div className="search-criteria">
        {this.renderCriteria()}
      </div>
    );
  }
}

SearchCriteria.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    options: PropTypes.shape({}),
  })).isRequired,
  fetch: PropTypes.func.isRequired,
};
