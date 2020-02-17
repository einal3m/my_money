import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import PageHeader from '../common/page-header';
import ImportTable from './import-table';
import { importTransactions } from '../../actions/import-actions';
import { groupedCategories } from '../../selectors/category-selector';

require('../../../css/common.scss');
require('../../../css/import.scss');

export class ImportPageComponent extends React.Component {

  importTransactions = () => {
    importTransactions();
  };

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
        <PageHeader title="import transactions" apiStatus={this.props.apiStatus}>
          <Button onClick={this.importTransactions}><i className="fa fa-file-text-o" /> Import</Button>
        </PageHeader>
        <div className="container import">
          {this.renderTitle()}
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
