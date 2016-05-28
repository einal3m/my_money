import React from 'react';
import moment from 'moment';

export default class Date extends React.Component {
  render() {
    return <div>{moment(this.props.date, 'YYYY-MM-DD').format('DD-MMM-YYYY')}</div>;
  }
}

Date.propTypes = {
  date: React.PropTypes.string.isRequired
};
