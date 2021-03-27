import React from 'react';
import PropTypes from 'prop-types';
import { showFormModal } from '../../actions/form-actions';

export default class SubcategoryRow extends React.Component {
  handleClick = () => {
    showFormModal('Subcategory', this.props.subcategory, { allowDelete: true });
  };

  render() {
    return (
      <div className="subcategory-row click-me" onClick={this.handleClick}>
        {this.props.subcategory.name}
      </div>
    );
  }
}

SubcategoryRow.propTypes = {
  subcategory: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
