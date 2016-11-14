import React from 'react';
import PageHeader from '../common/page-header';
import SearchCriteria, { DATE_RANGE_FILTER, CATEGORY_FILTER } from '../common/criteria/search-criteria';

export default class SubcategoryReport extends React.Component {

  fetchReport = () => {
    console.log('fetch subcategory report data');
  };

  render() {
    return (
      <div>
        <PageHeader title="subcategory report" />
        <SearchCriteria
          filters={[{ name: CATEGORY_FILTER }, { name: DATE_RANGE_FILTER }]}
          fetch={this.fetchReport}
        />
      </div>
    );
  }
}
