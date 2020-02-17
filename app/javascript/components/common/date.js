import React from 'react';
import moment from 'moment';

const Date = props => (
  <div>{moment(props.date, 'YYYY-MM-DD').format('DD-MMM-YYYY')}</div>
);

Date.propTypes = {
  date: React.PropTypes.string.isRequired,
};

export default Date;
