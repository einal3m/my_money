import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePickerPanel from './DatePickerPanel';

export default function DatePickerDayView(props) {

  const renderDayTitles = () => {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return days.map(day => (<th key={day}>{day}</th>));
  };

  const firstDayOfView = () => {
    const firstDayOfMonth = moment(props.viewDate).startOf('month');
    const firstDayWeekDay = firstDayOfMonth.day();
    return firstDayOfMonth.subtract(firstDayWeekDay, 'days');
  };

  const lastDayOfView = () => {
    const lastDayOfMonth = moment(props.viewDate).endOf('month');
    const lastDayWeekDay = lastDayOfMonth.day();
    return lastDayOfMonth.add(6 - lastDayWeekDay, 'days');
  };

  const areDatesEqual = (date1, date2) => (
    date1.date() === date2.date() && date1.month() === date2.month() && date1.year() === date2.year()
  );

  const onClickHandler = (date) => {
    props.closePicker(date);
  };

  const valueForDate = (date) => ({ date: date.date(), month: date.month(), year: date.year() });

  const renderDays = () => {
    const rows = [];
    let cells = [];
    const date = moment(firstDayOfView());
    const outOfViewDate = lastDayOfView().add(1, 'day');

    while (!areDatesEqual(date, outOfViewDate)) {
      cells.push(
        <td key={`cell${date.date()}-${date.month()}`}>
          <DatePickerPanel
            value={valueForDate(date)}
            label={`${date.date()}`}
            onClick={onClickHandler}
            muted={date.month() !== props.viewDate.month()}
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

  return (
    <table className="day-table">
      <thead>
        <tr>
          {renderDayTitles()}
        </tr>
      </thead>
      <tbody>
        {renderDays()}
      </tbody>
    </table>
  );
}

DatePickerDayView.propTypes = {
  viewDate: PropTypes.shape({
    format: PropTypes.func.isRequired,
    month: PropTypes.func.isRequired,
  }).isRequired,
  closePicker: PropTypes.func.isRequired,
};
