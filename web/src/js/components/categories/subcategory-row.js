import React from 'react';

export default class SubcategoryRow extends React.Component {
  handleClick() {
    this.props.onClickHandler(this.props.subcategory);
  }

  render() {
    return (
      <tr onClick={this.handleClick.bind(this)} >
        <td>{this.props.subcategory.name}</td>
      </tr>
    );
  }
}

SubcategoryRow.propTypes = {
  subcategory: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired
  }).isRequired,
  onClickHandler: React.PropTypes.func.isRequired
};
