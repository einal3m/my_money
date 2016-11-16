import React from 'react';
import PageHeader from '../common/page-header';
import ReportViewButtons from '../common/controls/report-view-buttons';
import SearchCriteria, { DATE_RANGE_FILTER, CATEGORY_FILTER } from '../common/criteria/search-criteria';
import ReportContent from './report-content';
import { getSubcategoryReport } from '../../actions/report-actions';
import { getAccounts } from '../../actions/account-actions';

export default class SubcategoryReport extends React.Component {

  constructor() {
    super();
    getAccounts({ useStore: true });
    this.fetchReport();
  }

  fetchReport = () => {
    getSubcategoryReport();
  };

  render() {
    return (
      <div>
        <PageHeader title="subcategory report">
          <ReportViewButtons />
        </PageHeader>
        <SearchCriteria
          filters={[{ name: CATEGORY_FILTER, options: { showSubcategories: true } }, { name: DATE_RANGE_FILTER }]}
          fetch={this.fetchReport}
        />
        <div className="container">
          <ReportContent />
        </div>
      </div>
    );
  }
}
