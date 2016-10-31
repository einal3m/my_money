import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../common/page-header';
import NewModelButtons from '../common/controls/new-model-buttons';
import { getPatterns } from '../../actions/pattern-actions';

require('../../../css/common.scss');

export class PatternList extends React.Component {
  constructor() {
    super();
    getPatterns();
  }

  render() {
    console.log(this.props.patterns);
    return (
      <div>
        <PageHeader title="my patterns" apiStatus={this.props.apiStatus} />
      </div>
    );
  }
}

PatternList.propTypes = {
  loaded: PropTypes.bool.isRequired,
  patterns: PropTypes.arrayOf(PropTypes.shape({})),
  apiStatus: PropTypes.shape({}),
};

function mapStateToProps(state) {
  return {
    loaded: state.patternStore.get('loaded'),
    patterns: state.patternStore.get('patterns').toJS(),
    apiStatus: state.apiStatusStore.toJS(),
  };
}

export default connect(mapStateToProps)(PatternList);
