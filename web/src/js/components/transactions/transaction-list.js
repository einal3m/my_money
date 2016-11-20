import React from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon } from 'react-bootstrap';
import PageHeader from '../common/page-header';
import SearchCriteria from './search-criteria';
import TransactionTable from './transaction-table';
import { uploadOFX } from '../../actions/import-actions';
import categoryActions from '../../actions/category-actions';
import FileChooserModal from '../import/file-chooser-modal';
import TransactionModal from './transaction-modal';
import { showFormModal } from '../../actions/form-actions';

require('../../../css/common.scss');

export class TransactionListComponent extends React.Component {
  constructor() {
    super();
    categoryActions.getCategories();

    this.state = {
      showImportModal: false,
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
    return (
      <div>
        <PageHeader title="my transactions" apiStatus={this.props.apiStatus}>
          <Button onClick={this.showModal}><i className="fa fa-file-text-o" /> Import</Button>
          <Button onClick={this.newTransaction}><Glyphicon glyph="plus" /> New</Button>
        </PageHeader>
        <div className="container">
          <SearchCriteria />
        </div>
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
  loaded: React.PropTypes.bool.isRequired,
  currentAccount: React.PropTypes.shape({ id: React.PropTypes.number }),
  apiStatus: React.PropTypes.shape({}),
};

function mapStateToProps(state) {
  return {
    loaded: state.accountStore.get('loaded'),
    currentAccount: state.accountStore.get('currentAccount').toJS(),
    apiStatus: state.apiStatusStore.toJS(),
  };
}

export default connect(mapStateToProps)(TransactionListComponent);
