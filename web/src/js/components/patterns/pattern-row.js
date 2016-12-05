import React, { PropTypes } from 'react';
import { showFormModal } from '../../actions/form-actions';
import { categoryAndSubcategory } from '../../util/transaction-util';

export default class PatternRow extends React.Component {

  onClickHandler = () => {
    showFormModal('Pattern', this.props.pattern, { allowDelete: true });
  };

  render() {
    return (
      <tr onClick={this.onClickHandler}>
        <td>{this.props.pattern.matchText}</td>
        <td>{this.props.pattern.notes}</td>
        <td>{categoryAndSubcategory(this.props.pattern, this.props.groupedCategories)}</td>
      </tr>
    );
  }
}

PatternRow.propTypes = {
  pattern: PropTypes.shape({
    matchText: PropTypes.string,
    notes: PropTypes.string,
    categoryId: PropTypes.number,
    subcategoryId: PropTypes.number,
  }).isRequired,
  groupedCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

