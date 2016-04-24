'use strict';

import {connect} from 'react-redux';
import PageHeader from '../common/page-header';
import ImportTable from './import-table';
import { Button } from 'react-bootstrap';
import importActions from '../../actions/import-actions';
import React from 'react';
import { groupedCategories } from '../../selectors/category-selector';
require("../../../css/common.scss");
require("../../../css/import.scss");

export class ImportPage extends React.Component {

  importTransactions() {
    importActions.importTransactions();
  }

  renderTitle() {
    return (
      <h5>
        into <strong>{this.props.account.name}</strong> account
      </h5>
    );
  }

  render() {
    return (
      <div>
        <PageHeader title="import transactions">
          <Button onClick={this.importTransactions.bind(this)}><i className="fa fa-file-text-o"></i> Import</Button>
        </PageHeader>
        <div className="container import">
          {this.renderTitle()}
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
    groupedCategories: groupedCategories(state).toJS(),
    subcategories: state.categoryStore.get('subcategories').toJS()
  };
}

export default connect(mapStateToProps)(ImportPage);
