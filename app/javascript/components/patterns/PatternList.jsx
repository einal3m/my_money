import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Glyphicon, Button } from 'react-bootstrap';
import PageHeader from '../common/page-header';
import SearchCriteria, { ACCOUNT_FILTER } from '../common/criteria/search-criteria';
import PatternTable from './pattern-table';
import PatternModal from './pattern-modal';
import { getPatterns } from '../../actions/pattern-actions';
import { showFormModal } from '../../actions/form-actions';

require('../../../css/common.scss');

export class PatternListComponent extends React.Component {
  constructor() {
    super();
    getPatterns();
  }

  newPattern = () => {
    showFormModal('Pattern', { accountId: this.props.currentAccount.id }, { allowDelete: false });
  };

  renderPatterns() {
    if (!this.props.patterns) return undefined;

    return this.props.patterns.map(
      pattern => (
        <div key={pattern.id}>
          {`${pattern.matchText}, ${pattern.notes}, ${pattern.categoryId}, ${pattern.subcategoryId}`}
        </div>
      ));
  }

  render() {
    return (
      <div>
        <PageHeader title="my patterns" apiStatus={this.props.apiStatus}>
          <Button onClick={this.newPattern}><Glyphicon glyph="plus" /> New</Button>
        </PageHeader>
        <SearchCriteria
          filters={[{ name: ACCOUNT_FILTER, options: { multiple: false } }]}
          fetch={getPatterns}
        />
        <div className="container">
          <PatternTable />
        </div>
        <PatternModal />
      </div>
    );
  }
}

PatternListComponent.propTypes = {
  currentAccount: PropTypes.shape({ id: PropTypes.number }),
  patterns: PropTypes.arrayOf(PropTypes.shape({})),
  apiStatus: PropTypes.shape({}),
};

function mapStateToProps(state) {
  return {
    loaded: state.patternStore.get('loaded'),
    patterns: state.patternStore.get('patterns').toJS(),
    currentAccount: state.accountStore.get('currentAccount').toJS(),
    apiStatus: state.apiStatusStore.toJS(),
  };
}

export default connect(mapStateToProps)(PatternListComponent);
