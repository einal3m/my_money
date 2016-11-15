import React, { PropTypes } from 'react';
import AccountFilter from './account-filter';
import DateRangeFilter from './date-range-filter';
import CategoryFilter from './category-filter';

export const DATE_RANGE_FILTER = 'DATE_RANGE_FILTER';
export const ACCOUNT_FILTER = 'ACCOUNT_FILTER';
export const CATEGORY_FILTER = 'CATEGORY_FILTER';

export default class SearchCriteria extends React.Component {

  renderFilter(name, options) {
    switch (name) {
      case DATE_RANGE_FILTER:
        return <DateRangeFilter key={DATE_RANGE_FILTER} fetch={this.props.fetch} />;
      case ACCOUNT_FILTER:
        return <AccountFilter key={ACCOUNT_FILTER} multiple fetch={this.props.fetch} />;
      case CATEGORY_FILTER:
        return (
          <CategoryFilter
            key={CATEGORY_FILTER}
            fetch={this.props.fetch}
            showSubcategories={options.showSubcategories}
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
      <div id="search-criteria" className="container">
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
