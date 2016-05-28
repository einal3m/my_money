'use strict';

import React from 'react';
import PageHeader from '../common/page-header';
import SearchCriteria from './search-criteria';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import TransactionTable from './transaction-table';
import importActions from '../../actions/import-actions';
import categoryActions from '../../actions/category-actions';
import FileChooserModal from '../import/file-chooser-modal';

require("../../../css/common.scss");

export class TransactionList extends React.Component {
  constructor() {
    super();
    categoryActions.getCategories();

    this.state = {
      showImportModal: false
    }
  }

  hideModal() {
    this.setState({showImportModal: false});
  }

  showModal() {
    this.setState({showImportModal: true});
  }

  formData(file){
    var data = new FormData();
    data.append('data_file', file);
    return data;
  }

  importTransactions(file) {
    this.hideModal();
    importActions.uploadOFX(this.props.currentAccount.get('id'), file);
  }

  renderImportModal() {
    if (this.state.showImportModal && this.props.loaded) {
      return (
        <FileChooserModal show={this.state.showImportModal} onHide={this.hideModal.bind(this)} 
          onImport={this.importTransactions.bind(this)} account={this.props.currentAccount.toJS()}/>
      );
    }
  }

  render() {
    return (
      <div>
        <PageHeader title="my transactions">
          <Button onClick={this.showModal.bind(this)}><i className="fa fa-file-text-o"></i> Import</Button>
        </PageHeader>
        <div className="container">
          <SearchCriteria />
        </div>
        <div className="container">
          <TransactionTable />
        </div>
        {this.renderImportModal()}
      </div>
    );
  }
}

TransactionList.propTypes = {
  loaded: React.PropTypes.bool.isRequired,
  currentAccount: React.PropTypes.shape({id: React.PropTypes.number}),
};

function mapStateToProps(state) {
  return {
    loaded: state.accountStore.get('loaded'),
    currentAccount: state.accountStore.get('currentAccount')
  };
}

export default connect(mapStateToProps)(TransactionList);