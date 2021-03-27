import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const Date = props => (
  <div>{moment(props.date, 'YYYY-MM-DD').format('DD-MMM-YYYY')}</div>
);

Date.propTypes = {
  date: PropTypes.string.isRequired,
};

export default Date;
