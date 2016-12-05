import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { groupedCategories, categoryDataLoaded } from '../../selectors/category-selector';
import PatternRow from './pattern-row';

export class PatternTableComponent extends React.Component {

  renderPatterns() {
    return this.props.patterns.map(pattern => (
      <PatternRow
        key={pattern.id}
        pattern={pattern}
        groupedCategories={this.props.groupedCategories}
      />
    ));
  }

  renderTitle() {
    if (this.props.loaded) {
      return <h3>patterns for &apos;{this.props.account.name}&apos; account</h3>;
    }
    return undefined;
  }

  renderTable() {
    if (!this.props.loaded) {
      return undefined;
    }
    if (this.props.patterns.length > 0) {
      return (
        <table className="table table-hover" id="pattern-table">
          <thead>
            <tr>
              <th>match text</th>
              <th>notes</th>
              <th>category</th>
            </tr>
          </thead>
          <tbody>
            {this.renderPatterns()}
          </tbody>
        </table>
      );
    }
    return <div>There are no patterns for this account</div>;
  }

  render() {
    return (
      <div>
        {this.renderTitle()}
        {this.renderTable()}
      </div>
    );
  }
}

PatternTableComponent.propTypes = {
  loaded: PropTypes.bool.isRequired,
  account: PropTypes.shape({ name: PropTypes.string }),
  patterns: PropTypes.arrayOf(PropTypes.shape({})),
  groupedCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

function mapStateToProps(state) {
  return {
    loaded: state.patternStore.get('loaded') && categoryDataLoaded(state),
    account: state.accountStore.get('currentAccount').toJS(),
    patterns: state.patternStore.get('patterns').toJS(),
    groupedCategories: groupedCategories(state).toJS(),
  };
}

export default connect(mapStateToProps)(PatternTableComponent);
