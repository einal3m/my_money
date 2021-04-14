import React from 'react';
import PropTypes from 'prop-types';
import D3PieChart from './D3PieChart';
import CategoryTotalRow from './CategoryTotalRow';
import SubcategoryTotalRow from './SubcategoryTotalRow';
import ReportTotalRow from './ReportTotalRow';

export default class PieAndTable extends React.Component {

  renderRows() {
    return this.props.tableData.rows.map((data) => {
      if (data.type === 'category') {
        const key = `${data.categoryId || 0}`;
        return <CategoryTotalRow key={key} {...data} />;
      }

      const key = `${data.categoryId}-${data.subcategoryId || 0}`;
      return <SubcategoryTotalRow key={key} {...data} />;
    });
  }

  renderPieChart() {
    return (
      <tr>
        <td colSpan="3">
          <D3PieChart
            data={this.props.pieChartData.data}
            labels={this.props.pieChartData.labels}
          />
        </td>
      </tr>
    );
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
            {this.renderPieChart()}
            {this.renderRows()}
            <ReportTotalRow amount={this.props.tableData.total} />
          </tbody>
        </table>
      </div>
    );
  }
}

PieAndTable.propTypes = {
  loaded: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  tableData: PropTypes.shape({
    total: PropTypes.number.isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf(['category', 'subcategory']).isRequired,
      categoryId: PropTypes.number,
      subcategoryId: PropTypes.number,
    })),
  }),
  pieChartData: PropTypes.shape({
    total: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(PropTypes.number),
    labels: PropTypes.arrayOf(PropTypes.string),
  }),
};
