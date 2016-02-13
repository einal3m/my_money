'use strict';

import {connect} from 'react-redux';
import PageHeader from '../common/page-header';
import React from 'react';
require("../../../css/common.scss");
require("../../../css/import.scss");

export class ImportPage extends React.Component {
  render() {
    return (
      <div>
        <PageHeader title="import transactions" />
        <div className="container import">
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.accountStore.get('currentAccount').toJS(),
    ofxTransactions: state.importStore.get('transactions').toJS()
  };
}

export default connect(mapStateToProps)(ImportPage);
