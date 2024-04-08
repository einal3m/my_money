import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigate } from 'react-router';
import { Button } from 'react-bootstrap';
import PageHeader from '../common/PageHeader';
import ImportTable from './ImportTable';
import { importTransactions } from '../../actions/import-actions';
import { groupedCategories } from '../../selectors/category-selector';

import '../../stylesheets/common.scss';
import '../../stylesheets/import.scss';

export class ImportPageComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      toTransactions: false,
    };
  }

  importTransactions = () => {
    importTransactions();
    this.setState({ toTransactions: true });
  };

  render() {
    if (this.state.toTransactions === true) {
      return <Navigate to='/transactions' />
    }

    return (
      <div>
        <PageHeader title="import transactions" apiStatus={this.props.apiStatus}>
          <Button onClick={this.importTransactions}><i className="fa fa-file-text-o" /> Import</Button>
        </PageHeader>
        <div className="container import">
          <h5 data-testid="import-title">
            into <strong>{this.props.account.name}</strong> account
          </h5>
          <ImportTable
            transactions={this.props.ofxTransactions}
            groupedCategories={this.props.groupedCategories}
            subcategories={this.props.subcategories}
          />
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
    subcategories: state.categoryStore.get('subcategories').toJS(),
    apiStatus: state.apiStatusStore.toJS(),
  };
}

ImportPageComponent.propTypes = {
  account: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  ofxTransactions: PropTypes.arrayOf(PropTypes.shape({})),
  groupedCategories: PropTypes.arrayOf(PropTypes.shape({})),
  subcategories: PropTypes.arrayOf(PropTypes.shape({})),
  apiStatus: PropTypes.shape({}),
};

export default connect(mapStateToProps)(ImportPageComponent);
