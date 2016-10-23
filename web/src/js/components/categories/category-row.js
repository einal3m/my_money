import React from 'react';
import SubcategoryRow from './subcategory-row';

export default class CategoryRow extends React.Component {
  handleClick() {
    this.props.onClickHandler(this.props.category);
  }

  render() {
    return (
      <tr className="category" onClick={this.handleClick.bind(this)} >
        <td>{this.props.category.name}</td>
      </tr>
    );
  }
}

CategoryRow.propTypes = {
  category: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
  }).isRequired,
  onClickHandler: React.PropTypes.func.isRequired,
};
