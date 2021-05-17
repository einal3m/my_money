import React from 'react';
import PropTypes from 'prop-types';
import DatePickerPanel from './DatePickerPanel';
import { DATE_PICKER_DAY_MODE } from './DatePickerConstants';

export default function DatePickerMonthView(props) {

  const grid = [
    ['Jan', 'Feb', 'Mar', 'Apr'],
    ['May', 'Jun', 'Jul', 'Aug'],
    ['Sep', 'Oct', 'Nov', 'Dec'],
  ];

  const handleClick = (month) => {
    props.setDate(month);
    props.setView(DATE_PICKER_DAY_MODE);
  };

  const renderGrid = () => {
    const month = 0;
    return grid.map((row, i) => <tr key={`row${i}`}>{renderRow(row, month + (i * 4))}</tr>);
  }

  const renderRow = (row, month) => {
    return row.map((label, i) => (
      <td key={`cell${i}`}>
        <DatePickerPanel value={{ month: month + i }} label={label} onClick={handleClick} muted={false} />
      </td>
    ));
  }

  return (
    <table className="month-table">
      <tbody>
        {renderGrid()}
      </tbody>
    </table>
  );
}

DatePickerMonthView.propTypes = {
  setView: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired,
};
