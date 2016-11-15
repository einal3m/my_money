import React from 'react';
import PageHeader from '../common/page-header';
import SearchCriteria, { DATE_RANGE_FILTER, CATEGORY_FILTER } from '../common/criteria/search-criteria';
import { getCategoryReport } from '../../actions/report-actions';

export default class CategoryReport extends React.Component {

  fetchReport = () => {
    getCategoryReport();
  };

  render() {
    return (
      <div>
        <PageHeader title="category report" />
        <SearchCriteria
          filters={[{ name: CATEGORY_FILTER, options: { showSubcategories: false } }, { name: DATE_RANGE_FILTER }]}
          fetch={this.fetchReport}
        />
      </div>
    );
  }
}
