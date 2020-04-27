import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import PageHeader from '../common/PageHeader';
import SearchCriteria from './SearchCriteria';
import TransactionTable from './TransactionTable';
import { uploadOFX } from '../../actions/import-actions';
import FileChooserModal from '../import/FileChooserModal';
import TransactionModal from './TransactionModal';
import { showFormModal } from '../../actions/form-actions';

import '../../stylesheets/common.scss';
import '../../stylesheets/transaction.scss';

export class TransactionListComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      showImportModal: false,
      toImport: false,
    };
  }

  hideModal = () => {
    this.setState({ showImportModal: false });
  };

  showModal = () => {
    this.setState({ showImportModal: true });
  };

  newTransaction = () => {
    showFormModal('Transaction', { accountId: this.props.currentAccount.id }, { allowDelete: false });
  };

  formData = (file) => {
    const data = new FormData();
    data.append('data_file', file);
    return data;
  };

  importTransactions = (file) => {
    this.hideModal();
    uploadOFX(this.props.currentAccount.id, file);
    this.setState({ toImport: true });
  };

  renderImportModal() {
    if (this.state.showImportModal && this.props.loaded) {
      return (
        <FileChooserModal
          show={this.state.showImportModal}
          onHide={this.hideModal}
          onImport={this.importTransactions}
          account={this.props.currentAccount}
        />
      );
    }
    return undefined;
  }

  render() {
    if (this.state.toImport === true) {
      return <Redirect to='/import' />
    }

    return (
      <div>
        <PageHeader title="my transactions" apiStatus={this.props.apiStatus}>
          <Button onClick={this.showModal}><i className="fa fa-file-text-o" /> Import</Button>
          <Button onClick={this.newTransaction}><i className="fas fa-plus" /> New</Button>
        </PageHeader>
        <SearchCriteria />
        <div className="container">
          <TransactionTable />
        </div>
        {this.renderImportModal()}
        <TransactionModal />
      </div>
    );
  }
}

TransactionListComponent.propTypes = {
  loaded: PropTypes.bool.isRequired,
  currentAccount: PropTypes.shape({ id: PropTypes.number }),
  apiStatus: PropTypes.shape({}),
};

function mapStateToProps(state) {
  return {
    loaded: state.accountStore.get('loaded'),
    currentAccount: state.accountStore.get('currentAccount').toJS(),
    apiStatus: state.apiStatusStore.toJS(),
  };
}

export default connect(mapStateToProps)(TransactionListComponent);
