import React from 'react';
import { showFormModal } from '../../actions/form-actions';

export default class CategoryRow extends React.Component {
  handleClick = () => {
    showFormModal('Category', this.props.category, true);
  };

  render() {
    return (
      <tr className="category">
        <td><button className="btn btn-link" onClick={this.handleClick}>{this.props.category.name}</button></td>
      </tr>
    );
  }
}

CategoryRow.propTypes = {
  category: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
  }).isRequired,
};
