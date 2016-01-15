import React from 'react';

export default class CategoryRow extends React.Component {
  handleClick() {
    this.props.editCategory(this.props.categoryType, this.props.category);
  }

  render() {
    return (
      <tr onClick={this.handleClick.bind(this)} >
        <td>{this.props.category.name}</td>
      </tr>
    );
  }
}
