import React from 'react';

export default class CategoryRow extends React.Component {
  handleClick() {
    this.props.onClickHandler(this.props.categoryType, this.props.category);
  }

  render() {
    return (
      <tr onClick={this.handleClick.bind(this)} >
        <td>{this.props.category.name}</td>
      </tr>
    );
  }
}

CategoryRow.propTypes = {
  categoryType: React.PropTypes.object.isRequired,
  category: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired
  }).isRequired,
  onClickHandler: React.PropTypes.func.isRequired
};
