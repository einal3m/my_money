import React from 'react';
import AccountFilter from './account-filter';
import DateRangeFilter from './date-range-filter';

export default class SearchCriteria extends React.Component {

  renderFilter(name) {
    switch (name) {
      case 'DATE_RANGE_FILTER':
        return <DateRangeFilter key='DATE_RANGE_FILTER' fetch={this.props.fetch} />;
      case 'ACCOUNT_FILTER':
        return <AccountFilter key='ACCOUNT_FILTER' fetch={this.props.fetch} />
    }
  }

  renderCriteria() {
    return this.props.filters.map(filter => this.renderFilter(filter.name));
  }

  render() {
    return (
      <div id='search-criteria' className='container'>
        {this.renderCriteria()}
      </div>
    );
  }
}
