import React from 'react';
import PropTypes from 'prop-types';
import { showFormModal } from '../../actions/form-actions';

export default class CategoryRow extends React.Component {
  handleClick = () => {
    showFormModal('Category', this.props.category, { allowDelete: true });
  };

  render() {
    return (
      <div className="category-row click-me" onClick={this.handleClick}>
        {this.props.category.name}
      </div>
    );
  }
}

CategoryRow.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
