import React, { PropTypes } from 'react';
import D3PieChart from './d3-pie-chart';

export default class PieAndTable extends React.Component {

  renderRows() {
    return <tr><td>this is a table</td></tr>;
  }

  render() {
    if (!this.props.loaded) {
      return <div />;
    }

    return (
      <div>
        <h3>{this.props.title}</h3>
        <table className="table table-hover table-report">
          <tbody>
            <tr><td><D3PieChart id={this.props.title} /></td></tr>
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

PieAndTable.propTypes = {
  loaded: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  reportData: PropTypes.shape({
    total: PropTypes.number.isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf(['category', 'subcategory']).isRequired,
      categoryId: PropTypes.number,
      subcategoryId: PropTypes.number,
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })),
  }),
};
