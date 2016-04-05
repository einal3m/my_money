'use strict';

import {connect} from 'react-redux';
import PageHeader from '../common/page-header';
import ImportTable from './import-table';
import { Button } from 'react-bootstrap';
import importActions from '../../actions/import-actions';
import React from 'react';
import categorySelector from '../../selectors/category-selector';
require("../../../css/common.scss");
require("../../../css/import.scss");

export class ImportPage extends React.Component {

  importTransactions() {
    importActions.importTransactions();
  }

  render() {
    return (
      <div>
        <PageHeader title="import transactions">
          <Button onClick={this.importTransactions.bind(this)}><i className="fa fa-file-text-o"></i> Import</Button>
        </PageHeader>
        <div className="container import">
          <ImportTable transactions={this.props.ofxTransactions}
                       groupedCategories={this.props.groupedCategories}
                       subcategories={this.props.subcategories} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.accountStore.get('currentAccount').toJS(),
    ofxTransactions: state.importStore.get('transactions').toJS(),
    groupedCategories: categorySelector(state).toJS(),
    subcategories: state.categoryStore.get('subcategories').toJS()
  };
}

export default connect(mapStateToProps)(ImportPage);
