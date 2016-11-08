import React, { PropTypes, Component } from 'react';
import DatePickerPanel from './date-picker-panel';
import { DATE_PICKER_DAY_MODE } from './date-picker-constants';

export default class DatePickerMonthView extends Component {

  grid = [
    ['Jan', 'Feb', 'Mar', 'Apr'],
    ['May', 'Jun', 'Jul', 'Aug'],
    ['Sep', 'Oct', 'Nov', 'Dec'],
  ];

  handleClick = (month) => {
    this.props.setDate(month);
    this.props.setView(DATE_PICKER_DAY_MODE);
  };

  renderGrid() {
    const month = 0;
    return this.grid.map((row, i) => <tr key={`row${i}`}>{this.renderRow(row, month + (i * 4))}</tr>);
  }

  renderRow(row, month) {
    return row.map((label, i) => (
      <td key={`cell${i}`}>
        <DatePickerPanel value={{ month: month + i }} label={label} onClick={this.handleClick} muted={false} />
      </td>
    ));
  }

  render() {
    return (
      <table className="month-table">
        <tbody>
          {this.renderGrid()}
        </tbody>
      </table>
    );
  }
}

DatePickerMonthView.propTypes = {
  setView: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired,
};
