import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import DatePickerPanel from './date-picker-panel';

export default class DatePickerDayView extends Component {

  renderDayTitles = () => {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return days.map(day => (<th key={day}>{day}</th>));
  };

  firstDayOfView = () => {
    const firstDayOfMonth = moment(this.props.viewDate).startOf('month');
    const firstDayWeekDay = firstDayOfMonth.day();
    return firstDayOfMonth.subtract(firstDayWeekDay, 'days');
  };

  lastDayOfView = () => {
    const lastDayOfMonth = moment(this.props.viewDate).endOf('month');
    const lastDayWeekDay = lastDayOfMonth.day();
    return lastDayOfMonth.add(6 - lastDayWeekDay, 'days');
  };

  areDatesEqual = (date1, date2) => (
    date1.date() === date2.date() && date1.month() === date2.month() && date1.year() === date2.year()
  );

  onClickHandler = (date) => {
    this.props.closePicker(date);
  };

  valueForDate = date => ({ date: date.date(), month: date.month(), year: date.year() });

  renderDays() {
    const rows = [];
    let cells = [];
    const date = moment(this.firstDayOfView());
    const outOfViewDate = this.lastDayOfView().add(1, 'day');

    while (!this.areDatesEqual(date, outOfViewDate)) {
      cells.push(
        <td key={`cell${date.date()}-${date.month()}`}>
          <DatePickerPanel
            value={this.valueForDate(date)}
            label={`${date.date()}`}
            onClick={this.onClickHandler}
            muted={date.month() !== this.props.viewDate.month()}
          />
        </td>
      );

      if (cells.length === 7) {
        rows.push(<tr key={`row${date.date()}-${date.month()}`}>{cells}</tr>);
        cells = [];
      }
      date.add(1, 'day');
    }

    return rows;
  }

  render() {
    return (
      <table className="day-table">
        <thead>
          <tr>
            {this.renderDayTitles()}
          </tr>
        </thead>
        <tbody>
          {this.renderDays()}
        </tbody>
      </table>
    );
  }
}

DatePickerDayView.propTypes = {
  viewDate: PropTypes.shape({
    format: PropTypes.func.isRequired,
    month: PropTypes.func.isRequired,
  }).isRequired,
  closePicker: PropTypes.func.isRequired,
};
