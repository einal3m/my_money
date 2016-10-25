import React from 'react';
import { showFormModal } from '../../actions/form-actions';

export default class SubcategoryRow extends React.Component {
  handleClick = () => {
    showFormModal('Subcategory', this.props.subcategory, true);
  };

  render() {
    return (
      <tr className="subcategory">
        <td><button className="btn btn-link" onClick={this.handleClick}>{this.props.subcategory.name}</button></td>
      </tr>
    );
  }
}

SubcategoryRow.propTypes = {
  subcategory: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
  }).isRequired,
};
