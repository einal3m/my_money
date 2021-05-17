import React from 'react';
import PropTypes from 'prop-types';
import DatePickerPanel from './DatePickerPanel';
import { DATE_PICKER_MONTH_MODE } from './DatePickerConstants';

export default function DatePickerYearView(props) {

  const grid = [
    [true, false, false, false],
    [false, false, false, false],
    [false, false, false, true],
  ];

  const handleClick = (year) => {
    props.setDate(year);
    props.setView(DATE_PICKER_MONTH_MODE);
  };

  const startOfDecade = () => {
    return (props.viewDate.year() - (props.viewDate.year() % 10) - 1);
  }

  const renderGrid = () => {
    const year = startOfDecade();
    return grid.map((row, i) => <tr key={`row${i}`}>{renderRow(row, year + (i * 4))}</tr>);
  }

  const renderRow = (row, year) => {
    return row.map((muted, i) => (
      <td key={`cell${i}`}>
        <DatePickerPanel value={{ year: year + i }} label={`${year + i}`} onClick={handleClick} muted={muted} />
      </td>
    ));
  }

  return (
    <table className="year-table">
      <tbody>
        {renderGrid()}
      </tbody>
    </table>
  );
}

DatePickerYearView.propTypes = {
  viewDate: PropTypes.shape({
    year: PropTypes.func.isRequired,
  }).isRequired,
  setView: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired,
};
