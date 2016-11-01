import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Glyphicon, Button } from 'react-bootstrap';
import PageHeader from '../common/page-header';
import PatternModal from './pattern-modal';
import { getPatterns } from '../../actions/pattern-actions';
import { showFormModal } from '../../actions/form-actions';

require('../../../css/common.scss');

export class PatternList extends React.Component {
  constructor() {
    super();
    getPatterns();
  }

  newPattern = () => {
    showFormModal('Pattern', { accountId: this.props.currentAccount.id }, false);
  };

  renderPatterns() {
    if (!this.props.patterns) return;

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
        {this.renderPatterns()}
        <PatternModal />
      </div>
    );
  }
}

PatternList.propTypes = {
  currentAccount: React.PropTypes.shape({ id: React.PropTypes.number }),
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

export default connect(mapStateToProps)(PatternList);
