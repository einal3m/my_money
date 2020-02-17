import React from 'react';
import { showFormModal } from '../../actions/form-actions';

export default class CategoryRow extends React.Component {
  handleClick = () => {
    showFormModal('Category', this.props.category, { allowDelete: true });
  };

  render() {
    return (
      <tr className="category" onClick={this.handleClick}>
        <td>{this.props.category.name}</td>
      </tr>
    );
  }
}

CategoryRow.propTypes = {
  category: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
  }).isRequired,
};
