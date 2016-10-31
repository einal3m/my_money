import React from 'react';
import { showFormModal } from '../../actions/form-actions';

export default class SubcategoryRow extends React.Component {
  handleClick = () => {
    showFormModal('Subcategory', this.props.subcategory, true);
  };

  render() {
    return (
      <tr className="subcategory" onClick={this.handleClick}>
        <td>{this.props.subcategory.name}</td>
      </tr>
    );
  }
}

SubcategoryRow.propTypes = {
  subcategory: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
  }).isRequired,
};
