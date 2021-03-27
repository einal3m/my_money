import React from 'react';
import PropTypes from 'prop-types';
import DatePickerPanel from './DatePickerPanel';
import { DATE_PICKER_MONTH_MODE } from './DatePickerConstants';

export default class DatePickerYearView extends React.Component {

  grid = [
    [true, false, false, false],
    [false, false, false, false],
    [false, false, false, true],
  ];

  handleClick = (year) => {
    this.props.setDate(year);
    this.props.setView(DATE_PICKER_MONTH_MODE);
  };

  startOfDecade() {
    return (this.props.viewDate.year() - (this.props.viewDate.year() % 10) - 1);
  }

  renderGrid() {
    const year = this.startOfDecade();
    return this.grid.map((row, i) => <tr key={`row${i}`}>{this.renderRow(row, year + (i * 4))}</tr>);
  }

  renderRow(row, year) {
    return row.map((muted, i) => (
      <td key={`cell${i}`}>
        <DatePickerPanel value={{ year: year + i }} label={`${year + i}`} onClick={this.handleClick} muted={muted} />
      </td>
    ));
  }

  render() {
    return (
      <table className="year-table">
        <tbody>
          {this.renderGrid()}
        </tbody>
      </table>
    );
  }
}

DatePickerYearView.propTypes = {
  viewDate: PropTypes.shape({
    year: PropTypes.func.isRequired,
  }).isRequired,
  setView: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired,
};
